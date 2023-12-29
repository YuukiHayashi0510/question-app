import { Meta, StoryObj } from '@storybook/react'
import DisplayMd from '.'

const meta: Meta<typeof DisplayMd> = {
  component: DisplayMd,
}

export default meta

type Story = StoryObj<typeof DisplayMd>

export const Default: Story = {
  args: {
    text: `# このサイトの使い方

## 基本的な使い方

基本的には、画面左上の≡マークのメニュー（ハンバーガーメニュー）でページを移動できます。

その他ページにもメニューから移動できます。

## 始め方

1. 新規登録orログインを行います。
1. 質問をするときは、質問フォームを選んで必要事項を入力しましょう！`,
  },
}

export const CodeAndText: Story = {
  args: {
    text: "# コード\nJavaScriptのコードを以下に示します\n```javascript\nconsole.log('hello')\n```",
  },
}
