import { auth } from '../setup'

export function getUserId(): string | undefined {
  const currentUser = auth.currentUser
  if (currentUser) return currentUser.uid
}

export function getUserMail(): string | undefined {
  const currentUser = auth.currentUser
  if (currentUser && currentUser.email) return currentUser.email
}
