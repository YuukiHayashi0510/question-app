/**
 * Slackにメッセージを送信する
 * @param {object} payload - Slack payload
 * @param {boolean} isLogging - ログ出力フラグ, 初期値false, 白Slack=false, 黒Slack=true
 * @returns {<void>}
 */
export function sendToSlack(payload: object, isLogging = false): void {
  const xml = new XMLHttpRequest()
  const url = isLogging
    ? process.env.NEXT_PUBLIC_LOG_WEBHOOK_URL
    : process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL
  if (!url) return

  xml.open('POST', url, false)
  xml.setRequestHeader(
    'content-type',
    'application/x-www-form-urlencoded;charset=UTF-8'
  )
  xml.send(`payload=${JSON.stringify(payload)}`)
}
