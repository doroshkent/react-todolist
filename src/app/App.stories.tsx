import type { Meta, StoryObj } from '@storybook/react'
import App from 'app/App'
import { ReduxStoreProviderDecorator } from 'common/stories/decorators/ReduxStoreProviderDecorator'
import { ThemeProviderDecorator } from 'common/stories/decorators/ThemeProviderDecorator'
import { withRouter } from 'storybook-addon-react-router-v6'

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, ThemeProviderDecorator, withRouter],
}

export default meta
type Story = StoryObj<typeof App>

export const AppStory: Story = {}
