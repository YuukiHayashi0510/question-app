/* eslint-disable no-console */
import {
  query,
  orderBy,
  limit,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore'
import { Form } from '~/types/pages/form'
import { State } from '~/types/pages/form/const'
import { FirestoreClient, Table } from './firestoreClient'

const QUESTION_LIMIT = 3

export default abstract class QuestionRepository {
  static get client() {
    return new FirestoreClient()
  }
  static get ref() {
    return this.client.getCollectionRef(Table.Question)
  }

  static async getQuestion(): Promise<QuerySnapshot<DocumentData>> {
    return await this.client.getData(
      query(this.ref, orderBy('date', 'desc'), limit(QUESTION_LIMIT))
    )
  }

  static async getQuestionNum(): Promise<number> {
    return await this.client.countData(this.ref)
  }

  static async getQuestionMore(
    count: number
  ): Promise<QuerySnapshot<DocumentData>> {
    return await this.client.getData(
      query(this.ref, orderBy('date', 'desc'), limit(count))
    )
  }

  static async insertQuestion(data: Form): Promise<string | void> {
    try {
      return await this.client.insertData(Table.Question, data)
    } catch (e) {
      console.error(e)
    }
  }

  static async updateState(id: string, value: State): Promise<void> {
    const docRef = this.client.getDocById(Table.Question, id)
    try {
      await this.client.updateData(docRef, {
        state: value,
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }

  static async deleteQuestion(id: string): Promise<void> {
    try {
      await this.client.deleteData(Table.Question, id)
      console.log('Document successfully deleted!')
    } catch (e) {
      console.error(e)
    }
  }
}
