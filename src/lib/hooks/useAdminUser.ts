import { useAdmin } from '~/components/provider/AdminProvider'
import { getStoreUsers } from '../Firebase/firestore'
import type { StoreUser } from '../Firebase/firestore'
import type { UserContext } from '~/types/admin'

export function useAdminUser() {
  const { context: admin, setContext: setAdmin } = useAdmin()

  async function fetchUserList() {
    const snapshot = await getStoreUsers()

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
