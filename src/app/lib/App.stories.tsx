import type { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'
import { App } from 'app/ui/App'
import { ReduxStoreProviderDecorator, ThemeProviderDecorator } from 'common/stories/decorators'

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator, ThemeProviderDecorator, withRouter],
}

export default meta
type Story = StoryObj<typeof App>

export const AppStory: Story = {}
