import { dateToLocaleString } from '~/lib/Date'
import { createBody } from '~/lib/Slack/lib/util/body'
import { Form } from '~/types/form'
import { Env } from '~/types/utils'
import { sendToSlack } from './util/xml'

/**
 * 質問の送信
 * @param {Form} message - メッセージ
 * @returns {<void>}
 */
export function sendToQuestion(message: Form): void {
  const body = createBody(message)
  const payload = {
    username: '質問送信Bot',
    icon_emoji: ':cat:',
    text: body,
  }

  sendToSlack(payload)
}

/**
 * アカウント登録時のリマインド
 * @param {string} name - アカウント名
 * @returns {<void>}
 */
export function sendToRemind(name: string): void {
  const body = `\`${name}\`さんが登録しました！\n`

  const payload = {
    username: '質問アプリ登録通知Bot',
    icon_emoji: ':ciel:',
    text: body,
  }
  sendToSlack(payload, true)
}

/**
 * 日報記入時のリマインド
 * @param {string} name - アカウント名
 * @param {Date} date - 日付
 * @param {boolean} isUpdate - 更新フラグ, false = 記入, true = 更新
 */
export function sendReportRemind(
  name: string,
  date: Date,
  isUpdate = false
): void {
  const dateStr = dateToLocaleString(date, true)
  const body = `\`${name}\`さんが日報を${
    isUpdate ? `更新` : `記入`
  }しました！ ${dateStr}`
  const payload = {
    username: '日報記入通知Bot',
    icon_emoji: ':ciel:',
    text: body,
  }

  sendToSlack(payload, true)
}
