import { Contents, Item, Report } from '.'

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
