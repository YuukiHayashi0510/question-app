/* eslint-disable no-console */
import {
  query,
  where,
  orderBy,
  startAt,
  endAt,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore'
import { MonthUtil } from '~/helpers/date/month'
import { Report } from '~/types/pages/report'
import { UserResponse } from '~/types/pages/user'
import { FirestoreClient, Table } from './firestoreClient'

export default abstract class ReportRepository {
  static get client() {
    return new FirestoreClient()
  }
  static get ref() {
    return this.client.getCollectionRef(Table.Report)
  }

  // 日報を月初から今日まで取得する
  static async getReport(userId: string): Promise<UserResponse> {
    const startDate = MonthUtil.getMonthFirstDate()
    const today = new Date()

    const userResponse: UserResponse = {
      isError: false,
      response: undefined,
    }
    try {
      userResponse.response = await this.client.getData(
        query(
          this.ref,
          where('userId', '==', userId),
          orderBy('date', 'asc'),
          startAt(startDate),
          endAt(today)
        )
      )
    } catch (e: any) {
      userResponse.isError = true
      userResponse.response = e.message
    }

    return userResponse
  }

  static async getDailyReportByDate(
    date: Date,
    uid: string
  ): Promise<QuerySnapshot<DocumentData>> {
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1)
    endDate.setHours(0, 0, 0, 0)

    return await this.client.getData(
      query(
        this.ref,
        where('userId', '==', uid),
        orderBy('date', 'asc'),
        startAt(startDate),
        endAt(endDate)
      )
    )
  }

  static async getMonthlyReportByDate(
    date: Date,
    uid: string
  ): Promise<QuerySnapshot<DocumentData>> {
    const startDate = MonthUtil.getMonthFirstDate(date)
    startDate.setHours(0, 0, 0, 0)
    const endDate = MonthUtil.getMonthFinalDate(date)
    endDate.setHours(23, 59, 59, 59)

    return await this.client.getData(
      query(
        this.ref,
        where('userId', '==', uid),
        orderBy('date', 'asc'),
        startAt(startDate),
        endAt(endDate)
      )
    )
  }

  static async insertReport(data: Report): Promise<string | void> {
    return await this.client.insertData(Table.Report, data)
  }

  static async updateReport(id: string, report: Report): Promise<void> {
    const docRef = this.client.getDocById(Table.Report, id)
    try {
      await this.client.updateData(docRef, { ...report })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error updating document: ', e)
    }
  }
}
