import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
  webpackFinal: async (config) => {
    if (!config.resolve) return config

    config.resolve.alias = {
      ...config.resolve?.alias,
      '~/components': path.resolve(__dirname, '../src/components'),
      '~/styles': path.resolve(__dirname, '../src/styles'),
    }

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          'next-i18next': 'react-i18next',
        },
      },
    }
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {},
    },
    '@storybook/addon-toolbars',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
