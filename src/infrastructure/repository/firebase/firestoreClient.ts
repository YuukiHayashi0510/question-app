/* eslint-disable no-console */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore'
import { app } from '~/infrastructure/utils/firebaseConfig'
import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Query,
} from 'firebase/firestore'

export enum Table {
  Question = 'questions',
  User = 'users',
  Report = 'reports',
}

export class FirestoreClient {
  get db() {
    return getFirestore(app)
  }

  async getData(query: Query<DocumentData>): Promise<any> {
    const snapshot = await getDocs(query)
    return snapshot
  }

  async insertData(table: Table, data: object): Promise<string | void> {
    try {
      const docRef = await addDoc(this.getCollectionRef(table), data)
      console.log('Document written with ID: ', docRef.id)
      return docRef.id
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  async updateData(
    docRef: DocumentReference<DocumentData>,
    data: { [x: string]: any }
  ): Promise<void> {
    await updateDoc(docRef, data)
  }

  async deleteData(table: Table, id: string): Promise<void> {
    try {
      await deleteDoc(doc(this.db, table, id))
    } catch (e) {
      console.error('Error deleting document: ', e)
    }
  }

  getCollectionRef(table: Table): CollectionReference<DocumentData> {
    switch (table) {
      case Table.Question:
        return collection(this.db, Table.Question)
      case Table.User:
        return collection(this.db, Table.User)
      case Table.Report:
        return collection(this.db, Table.Report)
      // * TABLEに追加したのに、処理を忘れている場合を弾く
      default: {
        const wrongTable: never = table
        throw new Error(`${wrongTable} is not in Table`)
      }
    }
  }

  getDocById(table: Table, id: string): DocumentReference<DocumentData> {
    return doc(this.db, table, id)
  }

  async countData(query: Query<DocumentData>): Promise<number> {
    const snapshot = await getCountFromServer(query)
    return snapshot.data().count
  }
}
