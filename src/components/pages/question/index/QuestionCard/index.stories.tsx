import { Meta, StoryObj } from '@storybook/react'
import { Timestamp } from 'firebase/firestore'
import { Language, State } from '~/types/pages/form/const'
import { Role } from '~/types/pages/user/const'
import QuestionCard from '.'

const meta: Meta<typeof QuestionCard> = { component: QuestionCard }

export default meta

type Story = StoryObj<typeof QuestionCard>

export const Default: Story = {
  args: {
    index: 1,
    question: {
      name: 'Storybook User',
      question: 'Storybookの使い方がわからない',
      problem:
        'Storybookでhooksを使うとエラーが出る. Storybook preview hooks can only be called inside decorators and story functions.',
      lang: Language.HTML,
      lang2: Language.HTML,
      code: '',
      code2: '',
      reference: 'https://github.com/storybookjs/testing-react/issues/30',
      expectation:
        'storyFnの形で使わないといけないのかもしれないが、形を合わせると別のコンポーネントでエラーになる',
      mentor: 'Storybook Docs',
      state: State.Yet,
      date: Timestamp.fromDate(new Date()),
    },
    role: Role.Student,
  },
}

export const Doing: Story = {
  args: {
    index: 1,
    question: {
      name: 'Storybook User',
      question: 'Storybookの使い方がわからない',
      problem:
        'Storybookでhooksを使うとエラーが出る. Storybook preview hooks can only be called inside decorators and story functions.',
      lang: Language.HTML,
      lang2: Language.HTML,
      code: '',
      code2: '',
      reference: 'https://github.com/storybookjs/testing-react/issues/30',
      expectation:
        'storyFnの形で使わないといけないのかもしれないが、形を合わせると別のコンポーネントでエラーになる',
      mentor: 'Storybook Docs',
      state: State.Doing,
      date: Timestamp.fromDate(new Date()),
    },
    role: Role.Student,
  },
}

export const Done: Story = {
  args: {
    index: 1,
    question: {
      name: 'Storybook User',
      question: 'Storybookの使い方がわからない',
      problem:
        'Storybookでhooksを使うとエラーが出る. Storybook preview hooks can only be called inside decorators and story functions.',
      lang: Language.HTML,
      lang2: Language.HTML,
      code: '',
      code2: '',
      reference: 'https://github.com/storybookjs/testing-react/issues/30',
      expectation:
        'storyFnの形で使わないといけないのかもしれないが、形を合わせると別のコンポーネントでエラーになる',
      mentor: 'Storybook Docs',
      state: State.Done,
      date: Timestamp.fromDate(new Date()),
    },
    role: Role.Student,
  },
}

export const Mentor: Story = {
  args: {
    index: 1,
    question: {
      name: 'Storybook User',
      question: 'Storybookの使い方がわからない',
      problem:
        'Storybookでhooksを使うとエラーが出る. Storybook preview hooks can only be called inside decorators and story functions.',
      lang: Language.HTML,
      lang2: Language.HTML,
      code: '',
      code2: '',
      reference: 'https://github.com/storybookjs/testing-react/issues/30',
      expectation:
        'storyFnの形で使わないといけないのかもしれないが、形を合わせると別のコンポーネントでエラーになる',
      mentor: 'Storybook Docs',
      state: State.Doing,
      tmpState: State.Doing,
      date: Timestamp.fromDate(new Date()),
    },
    role: Role.Mentor,
  },
}

export const Admin: Story = {
  args: {
    index: 1,
    question: {
      name: 'Storybook User',
      question: 'Storybookの使い方がわからない',
      problem:
        'Storybookでhooksを使うとエラーが出る. Storybook preview hooks can only be called inside decorators and story functions.',
      lang: Language.HTML,
      lang2: Language.HTML,
      code: '',
      code2: '',
      reference: 'https://github.com/storybookjs/testing-react/issues/30',
      expectation:
        'storyFnの形で使わないといけないのかもしれないが、形を合わせると別のコンポーネントでエラーになる',
      mentor: 'Storybook Docs',
      state: State.Doing,
      tmpState: State.Doing,
      date: Timestamp.fromDate(new Date()),
    },
    role: Role.Admin,
  },
}
