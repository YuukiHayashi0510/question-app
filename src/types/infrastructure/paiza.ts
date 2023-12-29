// ビルド結果。正常終了：success, 以上終了：failure, タイムアウト（最大1秒）：timeout
export enum Result {
  Success = 'success',
  Failure = 'failure',
  Timeout = 'timeout',
}

// 実行状態
type Status = 'running' | 'completed'

export type CreateParams = {
  source_code: string // コード
  language: 'python3' //言語指定, http://api.paiza.io/docs/swagger/#!/runners を参考に
  input: string // 入力
  longpoll?: boolean // 有効にすると、APIのリクエストにかかる時間+コードの実行時間が経過した後にレスポンス
  longpoll_timeout?: number
  api_key: 'guest' // 固定
}

export type CreateResponse = {
  id: string // セッションID(実行結果の取得に使う)
  status: Status
}

export type GetDetailsResponse = {
  id: string
  language: 'python3'
  status: Status
  build_stdout: string | null // ビルド実行後、正常終了時の標準出力
  build_stderr: string | null // ビルド実行後、異常終了時の標準出力
  build_exit_code: number // ビルド実行後の終了コード
  build_time: number | null // ビルド実行にかかった時間（秒）
  build_memory: number // ビルド実行に使ったメモリ（byte）
  build_result: Result // ビルド結果
  stdout: string // コード実行後、正常終了時の標準出力
  stderr: string // コード実行後、異常終了時の標準出力
  exit_code: number // コード実行後の終了コード
  time: string // コードの実行にかかった時間（秒）
  memory: number // コードの実行に使ったメモリ（byte）
  result: Result
}
