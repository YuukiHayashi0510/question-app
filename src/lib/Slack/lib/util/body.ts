import { t } from 'i18next'
import { Form } from '~/types/form'

/**
 * Slackに送信するメッセージの作成
 * @param {Form} message - メッセージ
 * @returns {string}
 */
export function createBody(message: Form): string {
  let body = '質問がありました！:fire:```\n'

  Object.keys(message).forEach((key) => {
    if (
      message[key] &&
      message[key].length > 0 &&
      key !== 'date' &&
      key !== 'state' &&
      !key.includes('code') &&
      !key.includes('lang')
    )
      body += t(`Question.${key}`) + '\n' + message[key] + '\n\n'
  })
  body += '```\n'

  return body
}
