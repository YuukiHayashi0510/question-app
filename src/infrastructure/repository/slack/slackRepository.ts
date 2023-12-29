import { t } from 'i18next'
import { DateLocale } from '~/helpers/date/locale'
import { Form } from '~/types/pages/form'
import { SlackClient } from './slackClient'

export default abstract class SlackRepository {
  static get client() {
    return new SlackClient()
  }

  static async sendQuestion(message: Form): Promise<void> {
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
    body += '```\n<https://geekquestion-7e8e3.web.app/question/|質問一覧>'

    const payload = {
      username: '質問送信Bot',
      icon_emoji: ':cat:',
      text: body,
    }

    await this.client.sendToUserChannel(payload)
  }

  static async sendAccountRemind(name: string): Promise<void> {
    const body = `\`${name}\`さんが登録しました！\n<https://geekquestion-7e8e3.web.app/|管理画面>から確認しましょう!`
    const channel =
      process.env.NODE_ENV === 'production' ? '#on76_ai_app_log' : ''

    const payload = {
      username: '質問アプリ登録通知Bot',
      icon_emoji: ':ciel:',
      text: body,
      channel: channel,
    }
    await this.client.sendToLogChannel(payload)
  }

  static async sendReportRemind(
    name: string,
    date: Date,
    isUpdate = false
  ): Promise<void> {
    const dateStr = DateLocale.translateShortJapanese(date)
    const body = `\`${name}\`さんが日報を${
      isUpdate ? `更新` : `記入`
    }しました！ ${dateStr}`
    const channel =
      process.env.NODE_ENV === 'production' ? '#on76_ai_app_log' : ''
    const payload = {
      username: '日報記入通知Bot',
      icon_emoji: ':ciel:',
      text: body,
      channel: channel,
    }

    await this.client.sendToLogChannel(payload)
  }
}
