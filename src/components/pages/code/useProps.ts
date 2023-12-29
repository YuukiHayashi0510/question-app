import { useState } from 'react'
import PaizaRepository from '~/infrastructure/repository/paiza/paizaRepository'
import { TestResult } from '~/types/pages/code'
import { Props } from './Layout'
import { initResult } from './utils'

export function useProps(): Props {
  const [code, setCode] = useState<Props['code']>('')
  const [result, setResult] = useState<Props['result']>(initResult)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: Props['onSubmit'] = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { id } = await PaizaRepository.postCode(code)
    const { stdout, stderr, time, memory, build_stderr } =
      await PaizaRepository.getResults(id)

    const numTime = Number(time)
    const err = stderr.replace('  File "Main.py", ', '').replace('^', '')
    const mem = Math.round((memory * 100) / (1024 * 1024)) / 100

    let type = TestResult.AC
    // 出力の最後に改行が入るため、除外してチェック
    if (stdout.slice(0, -1) !== 'abc') type = TestResult.WA
    if (build_stderr) type = TestResult.CE
    if (stderr) type = TestResult.RE
    if (numTime > 200) type = TestResult.TLE
    if (mem > 256) type = TestResult.MLE

    setResult({ stdout, stderr: err, time: numTime, memory: mem, type })
    setIsLoading(false)
  }

  return { code, result, isLoading, setCode, onSubmit }
}
