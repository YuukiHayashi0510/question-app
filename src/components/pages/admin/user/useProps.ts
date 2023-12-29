import { t } from 'i18next'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useAdminUser } from '~/hooks/useAdminUser'
import UserRepository from '~/infrastructure/repository/firebase/userRepository'
import { useAdmin } from '~/providers/AdminProvider'
import { Role, columns } from '~/types/pages/user/const'
import type { Props } from './Layout'
import type { ModalValue } from '~/types/pages/admin'

export function useProps(): Props {
  const [isOpen, setIsOpen] = useState<Props['modalProps']['isOpen']>(false)
  const [modalValue, setModalValue] = useState<ModalValue>({
    uid: '',
    id: '',
    name: '',
    role: Role.Student,
  })
  const [target, setTarget] = useState<string[]>([])
  const { context: admin, setContext: setAdmin } = useAdmin()
  useAdminUser()
  const alert = useAlert()

  const onClickEdit: Props['onClickEdit'] = () => {
    if (target.length > 1 || target.length === 0) {
      alert.error(t('Alert.Admin.edit'))
      return
    }

    const value = admin.user.filter((u) => target[0] === u['id'])[0]
    setModalValue(value)
    setIsOpen(true)
  }

  const onClickUpdate: Props['modalProps']['onClickUpdate'] = async () => {
    if (!confirm(t('Button.confirm') as string)) return

    await UserRepository.updateUser(modalValue['id'] as string, {
      id: modalValue.uid,
      name: modalValue.name,
      role: modalValue.role,
    })
      .then(() => alert.success(t('Alert.Admin.update')))
      .catch((e) => alert.error(e))

    setIsOpen(false)

    const updateUser = admin.user.map((u) => {
      if (u.id !== modalValue.id) return u
      return {
        ...u,
        name: modalValue.name,
        role: modalValue.role,
      }
    })

    setAdmin((prev) => ({ ...prev, user: updateUser }))
  }

  const onClickDelete: Props['onClickDelete'] = async () => {
    if (!confirm(t('Button.confirm') as string)) return

    let tmpUser = [...admin.user] // 後々アプリ側に反映させる用
    for (const id of target) {
      tmpUser = tmpUser.filter((u) => id !== u.id)
      await UserRepository.deleteUser(id)
    }
    setAdmin((prev) => ({ ...prev, user: tmpUser }))
  }

  return {
    userList: admin.user,
    modalProps: {
      isOpen,
      setIsOpen,
      modalValue,
      onChangeModalName: (value) =>
        setModalValue((old) => ({ ...old, name: value })),
      onChangeModalRole: (value) =>
        setModalValue((old) => ({ ...old, role: value as Role })),
      onClickUpdate,
    },
    columns,
    onStateChange: (value) => setTarget(value),
    onClickEdit,
    onClickDelete,
  }
}
