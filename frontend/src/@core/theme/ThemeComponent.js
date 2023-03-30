import React, { useEffect } from 'react'

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Theme Override Imports
import overrides from './overrides'
import typography from './typography'

// ** Theme
import themeOptions from './ThemeOptions'

// ** Global Styles
import GlobalStyling from './globalStyles'

const ThemeComponent = props => {
  // ** Props
  const { settings, saveSettings, children } = props

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings)

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig)

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography(theme) }
  })

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  useEffect(() => {
    let mode = 'light'
    if (localStorage.getItem('rf_app_theme'))
      mode = localStorage.getItem('rf_app_theme')
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      mode = 'dark'
    saveSettings({ ...settings, mode })

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      saveSettings({ ...settings, mode: event.matches ? "dark" : "light" })
      localStorage.setItem('rf_app_theme', event.matches ? "dark" : "light")
  });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme)} />
      {children}
    </ThemeProvider>
  )
}

export default ThemeComponent
