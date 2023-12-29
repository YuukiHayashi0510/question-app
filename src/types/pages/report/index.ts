// １項目の内容
export type Item = {
  time: string // 所要時間
  memo?: string // メモ
}

export type Contents = {
  support: Item // 受講生対応
  event: Item // 月次イベント
  zemi: Item // ゼミ
  study: Item // 勉強会
  room: Item // ルーム会
  other: Item
}

export type Report = {
  docId?: string
  userId: string
  con: Contents
  mtg: Item // 定例、セクション以外のMTG
  date: Date
}
