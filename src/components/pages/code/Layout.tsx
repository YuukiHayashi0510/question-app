import React, { Dispatch, FormEvent, SetStateAction } from 'react'
import Editor from 'react-simple-code-editor'
import LoadingButton from '~/components/base/Button/LoadingButton'
import CodeResultChip from '~/components/base/Chip/CodeResult'
import { hightlightWithLineNumbers, Result } from './utils'

import 'prismjs/components/prism-python' // 言語と一致するprismを入れておかないとエラーになる
import 'prismjs/themes/prism.css'

export type Props = {
  code: string
  result: Result
  isLoading: boolean
  setCode: Dispatch<SetStateAction<string>>
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function Layout({ code, result, isLoading, setCode, onSubmit }: Props) {
  const q = '"abc"の文字列を表示してください。'
  return (
    <div className='my-6'>
      <div className='my-4 break-all text-lg'>{q}</div>
      <form className='flex gap-4' onSubmit={(e) => onSubmit(e)}>
        <Editor
          className='editor min-h-[10rem] w-[50rem] rounded border-2 border-slate-400'
          highlight={(value) => hightlightWithLineNumbers(value)}
          onValueChange={(value) => setCode(value)}
          padding={10}
          placeholder='Enter your code'
          required
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
          }}
          textareaId='codeArea'
          value={code}
        />
        <LoadingButton
          className='max-h-[2.5rem] bg-blue-500'
          isLoading={isLoading}
          type='submit'
          variant='contained'
        >
          送信
        </LoadingButton>
      </form>
      {result.stdout || result.stderr ? (
        <div className='my-6 w-[50rem]'>
          <div className='my-2 flex items-center gap-2'>
            <span className='text-lg font-semibold'>実行結果</span>
            <CodeResultChip label={result.type} />
          </div>
          <ul className='my-2 flex gap-4'>
            <li>実行時間：{result.time}s</li>
            <li>使用メモリ：{result.memory}MB</li>
          </ul>
          <textarea
            className='h-40 w-full rounded bg-black p-4 font-mono text-white'
            disabled
            value={result.stdout || result.stderr}
          />
        </div>
      ) : null}
    </div>
  )
}

export default Layout
