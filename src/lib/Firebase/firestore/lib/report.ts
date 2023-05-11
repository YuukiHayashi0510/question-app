import {
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getMonthFinalDate, getMonthFirstDate } from '~/lib/Date'
import { Report } from '~/types/report'
import { UserResponse } from '~/types/user'
import { getCollectionRef, getDocById, Table } from './util'
import type { Snapshot } from './util'
import { insertData } from '.'

/**
 * 日報を月初から今日まで取得する
 * @param {string} userId Firebase AuthのユーザーID
 * @returns {Promise<UserResponse>} エラー情報があればエラー、なければ日報
 */
export async function getReport(userId: string): Promise<UserResponse> {
  const startDate = getMonthFirstDate()
  const today = new Date()

  const ref = getCollectionRef(Table.Report)

  let response: any = undefined
  let isError = false
  try {
    response = await getDocs(
      query(
        ref,
        where('userId', '==', userId),
        orderBy('date', 'asc'),
        startAt(startDate),
        endAt(today)
      )
    )
  } catch (e: any) {
    isError = true
    response = e.message
  }

  return { isError, response }
}

/**
 * 日報をその日のみ取得する
 * @param date 日付
 * @param uid Firebase AuthのユーザーID
 * @returns {Promise<Snapshot | undefined>} ReportのSnapshot
 */
export async function getReportByDate(
  date: Date,
  uid: string
): Promise<Snapshot> {
  const startDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(date)
  endDate.setDate(endDate.getDate() + 1)
  endDate.setHours(0, 0, 0, 0)

  const ref = getCollectionRef(Table.Report)
  const snapshot = await getDocs(
    query(
      ref,
      where('userId', '==', uid),
      orderBy('date', 'asc'),
      startAt(startDate),
      endAt(endDate)
    )
  )

  return snapshot
}

/**
 * 1ヶ月分の日報を取得する
 * @param {Date} date 日付
 * @param {string} uid Firebase AuthのユーザーID
 * @returns {Promise<Snapshot>} ReportのSnapshot
 */
export async function getMonthlyReportByDate(
  date: Date,
  uid: string
): Promise<Snapshot> {
  const startDate = getMonthFirstDate(date)
  startDate.setHours(0, 0, 0, 0)
  const endDate = getMonthFinalDate(date)
  endDate.setHours(23, 59, 59, 59)

  const ref = getCollectionRef(Table.Report)
  const snapshot = await getDocs(
    query(
      ref,
      where('userId', '==', uid),
      orderBy('date', 'asc'),
      startAt(startDate),
      endAt(endDate)
    )
  )

  return snapshot
}

/**
 * 日報を追加する
 * @param {Report} data 日報のデータ
 * @returns {Promise<string | void>} DocumentID | void
 */
export async function insertReport(data: Report): Promise<string | void> {
  return await insertData(Table.Report, data)
}

/**
 * 日報を更新する
 * @param {string} id 日報のDocumentID
 * @param {Report} report 日報のデータ
 * @returns {Promise<void>}
 */
export async function updateReport(id: string, report: Report): Promise<void> {
  const docRef = getDocById(Table.Report, id)
  try {
    await updateDoc(docRef, { ...report })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error updating document: ', e)
  }
}
