// １項目の内容
type Item = {
  time: string // 所要時間
  memo?: string // メモ
}

type Contents = {
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

const initItem: Item = {
  time: '0',
  memo: '',
}


const initContents: Contents = {
  support: initItem,
  event: initItem,
  zemi: initItem,
  study: initItem,
  room: initItem,
  other: initItem,
}


export const initReport: Report = {
  userId: '',
  con: initContents,
  mtg: initItem,
  date: new Date(),
}

export const contentsKey = Object.keys(initContents)
