import { highlight, languages } from 'prismjs/components/prism-core'
import { TestResult } from '~/types/pages/code'

export type Result = {
  stdout: string
  stderr: string
  time: number
  memory: number
  type: TestResult
}

// language="python" => highlight={(code) => highlight(code, languages.python)}
export const hightlightWithLineNumbers = (code: string) =>
  highlight(code, languages.python)
    .split('\n')
    .map(
      (line: string, i: number) =>
        `<span class='editorLineNumber'>${i + 1}</span>${line}`
    )
    .join('\n')

export const initResult: Result = {
  stdout: '',
  stderr: '',
  time: 0,
  memory: 0,
  type: TestResult.AC,
}
