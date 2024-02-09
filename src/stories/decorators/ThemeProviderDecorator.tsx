import React from 'react'
import { ThemeProvider } from "@mui/material";
import { theme } from "styles/theme";
import { GlobalStyle } from 'styles/Global.styled';

export const ThemeProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <ThemeProvider theme={ theme }>
    <GlobalStyle />
    { storyFn() }
  </ThemeProvider>
}
