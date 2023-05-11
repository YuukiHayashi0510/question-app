import { collection, doc } from 'firebase/firestore'
import { Table } from './const'
import { CollectionRef, DocumentRef } from './types'
import { db } from '../../setup'

/**
 * コレクションの参照を返す
 * @param {Table} table コレクションの参照を取得するテーブル名
 * @returns {CollectionRef} コレクションの参照
 */
export function getCollectionRef(table: Table): CollectionRef {
  switch (table) {
    case Table.Question:
      return collection(db, Table.Question)
    case Table.User:
      return collection(db, Table.User)
    case Table.Report:
      return collection(db, Table.Report)
    // TABLEには追加したのに、処理を忘れている場合を弾く
    default: {
      const wrongTable: never = table
      throw new Error(`${wrongTable} is not in Table`)
    }
  }
}

/**
 * ドキュメントの参照をIDを元に返す
 * @param {Table} table 参照を取得するテーブル名
 * @param {string} id 参照を取得するドキュメントのID
 * @returns {DocumentRef} 参照
 */
export function getDocById(table: Table, id: string): DocumentRef {
  return doc(db, table, id)
}
