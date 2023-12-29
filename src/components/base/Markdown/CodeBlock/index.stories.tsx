import { Meta, StoryObj } from '@storybook/react'
import { Language } from '~/types/pages/form/const'
import CodeBlock from '.'

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
}

export default meta

type Story = StoryObj<typeof CodeBlock>

export const Python: Story = {
  args: {
    language: Language.Python,
    value: `a = 1\nprint(f”a = {a} “)`,
  },
}

export const HTML: Story = {
  args: {
    language: Language.HTML,
    value: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    
  </body>
</html>`,
  },
}

export const CSS: Story = {
  args: {
    language: Language.CSS,
    value: `@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
  scroll-padding-block-start: 80px;
}
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}`,
  },
}

export const JavaScript: Story = {
  args: {
    language: Language.JavaScript,
    value: `let a = 1\nconsole.log(a)`,
  },
}
