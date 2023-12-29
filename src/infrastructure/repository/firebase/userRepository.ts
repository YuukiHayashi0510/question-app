/* eslint-disable no-console */
import {
  query,
  where,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore'
import { StoreUser } from '~/types/infrastructure/firebase/firestore'
import { SessionUser } from '~/types/pages/user'
import { Area } from '~/types/pages/user/const'
import { FirestoreClient, Table } from './firestoreClient'

export default abstract class UserRepository {
  static get client() {
    return new FirestoreClient()
  }
  static get ref() {
    return this.client.getCollectionRef(Table.User)
  }

  static async getUsers(): Promise<QuerySnapshot<DocumentData>> {
    return await this.client.getData(this.ref)
  }

  static async getCurrentUser(uid: string): Promise<StoreUser> {
    const snapshot = await this.client.getData(
      query(this.ref, where('id', '==', uid))
    )
    return snapshot.docs[0].data() as StoreUser
  }

  static async getSnapshotUserByUid(
    uid: string
  ): Promise<QuerySnapshot<DocumentData>> {
    return await this.client.getData(query(this.ref, where('id', '==', uid)))
  }

  static async getUsersByArea(area: Area) {
    return await this.client.getData(query(this.ref, where('area', '==', area)))
  }

  static async insertUser(data: SessionUser): Promise<void> {
    try {
      await this.client.insertData(Table.User, data)
      console.log('Document successfully inserted!')
    } catch (e) {
      console.error('Error inserting document', e)
    }
  }

  static async updateUser(id: string, user: SessionUser): Promise<void> {
    const docRef = this.client.getDocById(Table.User, id)
    try {
      await this.client.updateData(docRef, {
        ...user,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }

  static async deleteUser(id: string): Promise<void> {
    try {
      await this.client.deleteData(Table.User, id)
    } catch (e) {
      console.error('Error deleting document: ', e)
    }
  }
}
