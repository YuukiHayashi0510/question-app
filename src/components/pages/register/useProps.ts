import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useForm } from 'react-hook-form'
import { Props } from '~/components/pages/register/Layout'
import { AuthRepository } from '~/infrastructure/repository/firebase/authRepository'
import UserRepository from '~/infrastructure/repository/firebase/userRepository'
import SlackRepository from '~/infrastructure/repository/slack/slackRepository'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { PageType } from '~/types/pages/page'
import { SessionUser, User } from '~/types/pages/user'
import { initUserForm, Role } from '~/types/pages/user/const'
import { getPathByRole } from './utils'

export function useProps(): Props {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    getValues,
  } = useForm<User>({
    defaultValues: initUserForm,
    criteriaMode: 'all',
    shouldFocusError: false,
    mode: 'onChange',
  })
  const router = useRouter()
  const isRegisterQuery = router.query.isRegister === 'true'
  const { setContext: setSessionUser } = useSessionUser()

  // login, signupの切り替え用, true -> signup
  const [isRegister, setIsRegister] = useState<boolean>(isRegisterQuery)
  const [isLoading, setIsLoading] =
    useState<Props['bottomProps']['isLoading']>(false)
  const [isOpen, setIsOpen] = useState<Props['modalProps']['isOpen']>(false)

  const alert = useAlert()

  const onClickRegister: Props['bottomProps']['onClickRegister'] = () => {
    setIsRegister(!isRegister)
    router.push({ query: { isRegister: !isRegister } })
  }

  const onSubmit: Props['onSubmit'] = () => {
    if (isRegister) {
      isValid ? signUp() : alert.error(t('Alert.valid.submit'))
    } else {
      isValid ? login() : alert.error(t('Alert.valid.submit'))
    }
  }

  const signUp = async () => {
    setIsLoading(true)
    const values = getValues()

    const { isError, response } = await AuthRepository.signUp(
      values['mail'],
      values['password']
    )

    if (isError) {
      alert.error(response)
      setIsLoading(false)
      return
    }

    const user: SessionUser = {
      id: AuthRepository.getUserId(),
      name: values.name,
      role: Role.Student,
      area: values.area,
    }

    await UserRepository.insertUser(user)
    setSessionUser(user)
    await SlackRepository.sendAccountRemind(user.name)
    setIsLoading(false)
    router.push(PageType.Standard.Question.url)
    alert.success('新規登録・ログインしました')
  }

  const login = async () => {
    setIsLoading(true)
    const mail = watch('mail')
    const password = watch('password')

    const { isError, response } = await AuthRepository.signIn(mail, password)

    if (isError) {
      alert.error(response.message)
      alert.error(t('Alert.Login.inValid'))
      setIsLoading(false)
      return
    }
    const userId = AuthRepository.getUserId()
    if (!userId) return

    const user = await UserRepository.getCurrentUser(userId)

    setSessionUser({
      id: userId,
      name: user['name'] as string,
      role: user['role'],
      area: user.area,
    })

    const path = getPathByRole(user.role)
    router.push(path)
    alert.info('ログインしました')
  }

  return {
    formProps: {
      control,
      isRegister,
      errors,
    },
    modalProps: { isOpen, setIsOpen },
    bottomProps: {
      isLoading,
      isRegister,
      onClickRegister,
      onClickReset: () => setIsOpen(true),
      onSubmit,
    },
    onSubmit,
    handleSubmit,
  }
}
