import type { Meta, StoryObj } from '@storybook/react';
import App from "App";
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator";
import { ThemeProviderDecorator } from "stories/decorators/ThemeProviderDecorator";

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
  tags: [ 'autodocs' ],
  decorators: [ ReduxStoreProviderDecorator, ThemeProviderDecorator ]
};

export default meta;
type Story = StoryObj<typeof App>;

export const AppStory: Story = {};
