import { t } from 'i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Props } from '~/components/pages/register/Layout'
import { useSessionUser } from '~/components/provider/SessionUserProvider'
import { authSignIn, authSignUp } from '~/lib/Firebase/auth'
import { getUserId } from '~/lib/Firebase/auth/lib/utils'
import { getCurrentUser, insertStoreUser } from '~/lib/Firebase/firestore'
import { sendToRemind } from '~/lib/Slack/lib/send'
import { PageType } from '~/types/page'
import { SessionUser, User } from '~/types/user'
import { initUserForm, Role } from '~/types/user/const'
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

  const onClickRegister: Props['bottomProps']['onClickRegister'] = () => {
    setIsRegister(!isRegister)
    router.push({ query: { isRegister: !isRegister } })
  }

  const onSubmit: Props['onSubmit'] = () => {
    if (isRegister) {
      isValid ? signUp() : alert(t('Alert.valid.submit'))
    } else {
      isValid ? login() : alert(t('Alert.valid.submit'))
    }
  }

  const signUp = async () => {
    setIsLoading(true)
    const values = getValues()

    const { isError, response } = await authSignUp(
      values['mail'],
      values['password']
    )

    if (isError) {
      alert(response)
      setIsLoading(false)
      return
    }

    const user: SessionUser = {
      id: getUserId(),
      name: values.name,
      role: Role.Student,
      area: values.area,
    }

    await insertStoreUser(user)
    setSessionUser(user)
    sendToRemind(user.name)
    setIsLoading(false)
    router.push(PageType.Standard.Question.url)
  }

  const login = async () => {
    setIsLoading(true)
    const mail = watch('mail')
    const password = watch('password')

    const { isError, response } = await authSignIn(mail, password)

    if (isError) {
      alert(response.message)
      alert(t('Alert.Login.inValid'))
      setIsLoading(false)
      return
    }
    const userId = getUserId()
    if (!userId) return

    const user = await getCurrentUser(userId)

    setSessionUser({
      id: userId,
      name: user['name'] as string,
      role: user['role'],
      area: user.area,
    })

    const path = getPathByRole(user.role)
    router.push(path)
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
