export enum State {
  Done = '完了',
  Doing = '対応中',
  Yet = '未対応',
}

export const AllStateType = Object.values(State)

export enum Language {
  Python = 'python',
  HTML = 'html',
  CSS = 'css',
  JavaScript = 'javascript',
}

export const AllLanguage = Object.values(Language)

export const initForm = {
  name: '',
  question: '',
  problem: '',
  lang: Language.Python,
  lang2: Language.Python,
  code: '',
  code2: '',
  reference: '',
  expectation: '',
  mentor: '',
  date: new Date(),
  state: State.Yet,
}
