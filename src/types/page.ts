enum PageBaseURL {
  Base = '/',
  Question = '/question/',
  Report = '/report/',
  Admin = '/admin/',
  Code = '/code/',
  Profile = '/profile/',
}

export const PageType = {
  Standard: {
    Top: {
      name: 'TOP',
      url: PageBaseURL.Base,
    },
    Question: {
      name: '質問一覧',
      url: PageBaseURL.Question,
    },
    Register: {
      name: 'ログイン・新規登録',
      url: PageBaseURL.Base + 'register',
    },
  },
  User: {
    Form: {
      name: '質問フォーム',
      url: PageBaseURL.Question + 'form',
    },
    Code: {
      name: 'コードテスト',
      url: PageBaseURL.Code,
    },
    Profile: {
      name: 'プロフィール',
      url: PageBaseURL.Profile,
    },
  },
  Admin: {
    Top: {
      name: '管理者ページ',
      url: PageBaseURL.Admin,
    },
    User: {
      name: 'ユーザー管理',
      url: PageBaseURL.Admin + 'user',
    },
    Report: {
      name: '日報管理',
      url: PageBaseURL.Admin + 'report',
    },
    Test: {
      name: 'コードテスト管理',
      url: '',
    },
    News: {
      name: 'お知らせの管理',
      url: '',
    },
  },
  Mentor: {
    Overview: {
      name: 'OverView',
      url: PageBaseURL.Report,
    },
    Daily: {
      name: '日報',
      url: PageBaseURL.Report + 'daily',
    },
  },
} as const

export type Pages = {
  name: string
  url: string
}
