import type { Preview } from '@storybook/react'

import { withThemeByClassName } from '@storybook/addon-styling'

import '~/styles/globals.css'
import '~/styles/storybook.css'

import React, { Suspense } from 'react'
// @ts-ignore
import { AllProviders } from '~/components/providers'

const withProviders = (Story) => {
  return (
    <Suspense fallback={<div>loading providers...</div>}>
      <AllProviders>
        <Story />
      </AllProviders>
    </Suspense>
  )
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    withProviders,
  ],
}

export default preview
