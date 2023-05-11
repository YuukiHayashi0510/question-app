import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSessionUser } from '~/components/provider/SessionUserProvider'
import { getUserMail } from '~/lib/Firebase/auth'
import { getSnapshotByUid, updateStoreUser } from '~/lib/Firebase/firestore'
import { Profile, SessionUser } from '~/types/user'
import { Area, initProfile } from '~/types/user/const'
import { Props } from './Layout'

export function useProps(): Props {
  const {
    control,
    formState: { errors, isValid },
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

  useEffect(() => {
    if (sessionUser) {
      const mail = getUserMail()
      if (mail) setValue('mail', mail)
      setUser(sessionUser)
    }
  }, [sessionUser.area])

  const onSubmit = async () => {
    if (!isValid) return

    setIsLoading(true)
    const values = getValues()
    const snapshot = await getSnapshotByUid(values.id as string)
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

    await updateStoreUser(docId as string, user)
    setSessionUser(user)
    alert('変更しました！')
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
    errors,
    isLoading,
    watch,
    onSubmit,
    handleSubmit,
  }
}
