import { getDocs, limit, orderBy, query, updateDoc } from 'firebase/firestore'
import { Form } from '~/types/form'
import { State } from '~/types/form/const'
import { deleteData, insertData } from './base'
import { getCollectionRef, getDocById, Table, QUESTION_LIMIT } from './util'
import type { Snapshot } from './util'

/**
 * Questionコレクションのドキュメントを日付順で全て取得する
 * @returns {Promise<Snapshot>} Questionコレクションのドキュメントを日付順で全て取得したスナップショット
 */
export async function getQuestion(): Promise<Snapshot> {
  const ref = getCollectionRef(Table.Question)
  const snapshot = await getDocs(
    query(ref, orderBy('date', 'desc'), limit(QUESTION_LIMIT))
  )
  return snapshot
}

/**
 * Questionコレクション内のドキュメント数を返す
 * @returns {Promise<number>} Questionコレクション内のドキュメント数
 */
export async function getQuestionNum(): Promise<number> {
  const ref = getCollectionRef(Table.Question)
  const snapshot = await getDocs(ref)
  return snapshot.size
}

/**
 * Questionコレクション内のドキュメントを+3ずつ日付順で全て取得する
 * @param {number} count 取得するドキュメント数
 * @returns {Promise<Snapshot>} Questionコレクション内のドキュメントを+3ずつ日付順で全て取得したスナップショット
 */
export async function getQuestionMore(count: number): Promise<Snapshot> {
  const ref = getCollectionRef(Table.Question)
  const snapshot = await getDocs(
    query(ref, orderBy('date', 'desc'), limit(count))
  )
  return snapshot
}

/**
 * Questionコレクションにドキュメントを追加する
 * @param {Form} data 追加するドキュメントのデータ
 * @returns {Promise<string | void>} DocumentId | console.error
 */
export async function insertQuestion(data: Form): Promise<string | void> {
  try {
    return await insertData(Table.Question, data)
  } catch (e) {
    console.error(e)
  }
}

/**
 * 質問の状態を更新する
 * @param {string} id 質問のID
 * @param {State} value 質問の状態
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function updateState(id: string, value: State): Promise<void> {
  const docRef = getDocById(Table.Question, id)
  try {
    await updateDoc(docRef, {
      state: value,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}

// delete
/**
 * 質問を削除する
 * @param {string} id 削除する質問のID
 * @returns {Promise<void>} console.errorでエラーが発生した場合にエラーを出力する
 */
export async function deleteQuestion(id: string): Promise<void> {
  try {
    await deleteData(Table.Question, id)
    console.log('Document successfully deleted!')
  } catch (e) {
    console.error(e)
  }
}
