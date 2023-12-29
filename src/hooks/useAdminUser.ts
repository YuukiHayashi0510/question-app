import UserRepository from '~/infrastructure/repository/firebase/userRepository'
import { useAdmin } from '~/providers/AdminProvider'
import { StoreUser } from '~/types/infrastructure/firebase/firestore'
import type { UserContext } from '~/types/pages/admin'

export function useAdminUser() {
  const { context: admin, setContext: setAdmin } = useAdmin()

  async function fetchUserList() {
    const snapshot = await UserRepository.getUsers()

    const userArray: UserContext = []
    snapshot.forEach((doc) => {
      const docData = doc.data() as StoreUser
      userArray.push({
        id: doc.id,
        uid: docData.id,
        name: docData.name,
        role: docData.role,
      })
    })

    setAdmin((prev) => ({ ...prev, user: userArray }))
  }

  if (admin.user.length === 0) fetchUserList()
}
