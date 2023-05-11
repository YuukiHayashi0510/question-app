import { getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { getCollectionRef, Table } from './util'
import { db } from '../setup'

// get
/**
 * Firestoreのドキュメントをコレクションに応じて取得する
 * @param {Table} table ドキュメントを取得するテーブル名
 * @returns {Promise<any>} ドキュメントを取得した結果
 */
export async function getData(table: Table): Promise<any> {
  const snapshot = await getDocs(getCollectionRef(table))
  return snapshot
}

// new
/**
 * データをFirestoreに挿入する
 * @param {Table} table ドキュメントを挿入するテーブル名
 * @param {object} data 挿入するデータ
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function insertData(
  table: Table,
  data: object
): Promise<string | void> {
  try {
    const docRef = await addDoc(getCollectionRef(table), data)
    console.log('Document written with ID: ', docRef.id)
    return docRef.id
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

// delete
/**
 * IDで指定したFirestoreのドキュメントを削除する
 * @param {Table} table ドキュメントを削除するテーブル名
 * @param {string} id 削除するドキュメントのID
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function deleteData(table: Table, id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, table, id))
  } catch (e) {
    console.error('Error deleting document: ', e)
  }
}
