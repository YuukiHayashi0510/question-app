import { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useForm } from 'react-hook-form'
import { AuthRepository } from '~/infrastructure/repository/firebase/authRepository'
import UserRepository from '~/infrastructure/repository/firebase/userRepository'
import { useSessionUser } from '~/providers/SessionUserProvider'
import { Profile, SessionUser } from '~/types/pages/user'
import { Area, initProfile } from '~/types/pages/user/const'
import { Props } from './Layout'

export function useProps(): Props {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm<Profile>({
    defaultValues: initProfile,
    criteriaMode: 'all',
    shouldFocusError: false,
  })

  const { context: sessionUser, setContext: setSessionUser } = useSessionUser()
  const [isLoading, setIsLoading] = useState<Props['isLoading']>(false)
  const alert = useAlert()

  useEffect(() => {
    if (sessionUser) {
      const mail = AuthRepository.getUserMail()
      if (mail) setValue('mail', mail)
      setUser(sessionUser)
    }
  }, [sessionUser.area])

  const onSubmit = async () => {
    if (!isValid) return

    setIsLoading(true)
    const values = getValues()
    const snapshot = await UserRepository.getSnapshotUserByUid(
      values.id as string
    )
    let docId = ''
    snapshot.forEach((doc) => {
      docId = doc.id
    })
    const user: SessionUser = {
      id: values.id,
      name: values.name,
      area: values.area,
      role: values.role,
    }

    await UserRepository.updateUser(docId as string, user)
    setSessionUser(user)
    alert.success('変更しました！')
    setIsLoading(false)
  }

  const setUser = (user: SessionUser) => {
    setValue('id', user.id)
    setValue('name', user.name)
    setValue('role', user.role)
    setValue('area', user.area || Area.Online)
  }

  return {
    control,
    isLoading,
    watch,
    onSubmit,
    handleSubmit,
  }
}
