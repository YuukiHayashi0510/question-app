export class SlackClient {
  async sendToLogChannel(payload: object): Promise<void> {
    const url = process.env.NEXT_PUBLIC_LOG_WEBHOOK_URL
    if (!url) return
    this.send(url, payload)
  }

  async sendToUserChannel(payload: object): Promise<void> {
    const url = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL
    if (!url) return
    this.send(url, payload)
  }

  private async send(url: string, payload: object): Promise<void> {
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: JSON.stringify(payload),
    })
  }
}
