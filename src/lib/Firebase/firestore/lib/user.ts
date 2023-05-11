import { getDocs, query, updateDoc, where } from 'firebase/firestore'
import { SessionUser } from '~/types/user'
import { Area } from '~/types/user/const'
import { getCollectionRef, getDocById, Table } from './util'
import type { Snapshot, StoreUser } from './util'
import { deleteData, getData, insertData } from '.'

/**
 * Userコレクションから現在ログインしているユーザーのドキュメントを取得する
 * @param {string} uid ユーザーのID
 * @returns {Promise<StoreUser>} Userコレクションから現在ログインしているユーザーのドキュメントを取得したデータ
 */
export async function getCurrentUser(uid: string): Promise<StoreUser> {
  const ref = getCollectionRef(Table.User)
  const snapshot = await getDocs(query(ref, where('id', '==', uid)))
  return snapshot.docs[0].data() as StoreUser
}

/**
 * Userコレクションから現在のユーザーのスナップショットを取得する
 * @returns {Promise<Snapshot>} 現在のユーザーのスナップショット
 */
export async function getSnapshotByUid(uid: string): Promise<Snapshot> {
  const ref = getCollectionRef(Table.User)
  const snapshot = await getDocs(query(ref, where('id', '==', uid)))
  return snapshot
}

/**
 * Userコレクションのユーザー全てを取得する
 * @returns {Promise<Snapshot>} Userコレクションのユーザー全てを取得したスナップショット
 */
export async function getStoreUsers(): Promise<Snapshot> {
  return await getData(Table.User)
}

export async function getUsersByArea(area: Area) {
  const ref = getCollectionRef(Table.User)
  const snapshot = await getDocs(query(ref, where('area', '==', area)))
  return snapshot
}

/**
 * Userコレクションにドキュメントを追加する
 * @param {SessionUser} data 追加するドキュメントのデータ
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function insertStoreUser(data: SessionUser): Promise<void> {
  try {
    await insertData(Table.User, data)
    console.log('Document successfully inserted!')
  } catch (e) {
    console.error('Error inserting document', e)
  }
}

/**
 * アカウント情報の編集
 * @param {string} id 編集するアカウント情報のドキュメントID
 * @param {SessionUser} user 編集するアカウント情報のデータ
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function updateStoreUser(
  id: string,
  user: SessionUser
): Promise<void> {
  const docRef = getDocById(Table.User, id)
  try {
    await updateDoc(docRef, {
      ...user,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}

/**
 * アカウント情報を削除する
 * @param {string} id 削除するアカウント情報のドキュメントID
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function deleteStoreUser(id: string): Promise<void> {
  try {
    await deleteData(Table.User, id)
  } catch (e) {
    console.error('Error deleting document: ', e)
  }
}
