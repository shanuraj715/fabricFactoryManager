import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import WeatherNight from 'mdi-material-ui/WeatherNight'
import WeatherSunny from 'mdi-material-ui/WeatherSunny'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings } = props

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      localStorage.setItem('rf_app_theme', 'dark')
      handleModeChange('dark')
    } else {
      localStorage.setItem('rf_app_theme', 'light')
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      {settings.mode === 'dark' ? <WeatherSunny /> : <WeatherNight />}
    </IconButton>
  )
}

export default ModeToggler
