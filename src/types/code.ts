export enum TestResult {
  AC = 'AC', // 正解/Accepted
  WA = 'WA', // 論理エラー/Wrong Answer
  TLE = 'TLE', // 実行時間制限超過/Time Limit Exceeded(200s)
  MLE = 'MLE', // メモリ超過/Memory Limit Exceeded(256MB)
  CE = 'CE', // コンパイルエラー/Compile Error
  RE = 'RE', // 実行時エラー/RuntimeError
}
