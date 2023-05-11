import { sendPasswordResetEmail } from 'firebase/auth'
import { UserResponse } from '~/types/user'
import { auth } from '../setup'

export async function resetPassword(email: string): Promise<UserResponse> {
  let response: UserResponse['response'] = undefined
  let isError: UserResponse['isError'] = false
  await sendPasswordResetEmail(auth, email)
    .then((data) => {
      response = data
    })
    .catch((error) => {
      response = error.message
      console.error(response)
      isError = true
    })

  return { isError, response }
}
