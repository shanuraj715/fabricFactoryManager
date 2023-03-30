// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

import { postRequest } from 'src/services/apiService';

// ** MUI Components
import {
  Box,
  Button,
  Divider,
  Checkbox,
  TextField,
  Typography,
  InputLabel,
  IconButton,
  CardContent,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Card as MuiCard,
  FormControlLabel as MuiFormControlLabel,
  Alert,
  Collapse
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Snackbar from 'src/customComponents/SnackBar/CustomSnackbar'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import axios from 'axios'

import { API_URL } from 'src/constants'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {

  const router = useRouter()

  // ** States
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false
  })

  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    type: 'success',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const validateForm = () => {
    const { username, email, password, confirmPassword } = values
    if (
      password.length === 0 ||
      username.length === 0 ||
      email.length === 0 ||
      confirmPassword.length === 0
    ) {
      setSnackbar({
        open: true,
        text: 'All fields are required',
        type: 'error'
      })

      return
    }

    if (username.length < 6 || username.length > 20) {
      setSnackbar({
        open: true,
        text: 'Username must be between 6 and 20 characters',
        type: 'error'
      })

      return
    }

    if (password.length < 8 || password.length > 30) {
      setSnackbar({
        open: true,
        text: 'Password must be between 8 and 30 characters',
        type: 'error'
      })

      return
    }

    if (!username.charAt(0).match(/[a-z]/i)) {
      setSnackbar({
        open: true,
        text: 'Username must start with a letter',
        type: 'error'
      })

      return
    }

    if (!email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setSnackbar({
        open: true,
        text: 'Invalid email address',
        type: 'error'
      })

      return
    }
    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        text: 'Passwords do not match',
        type: 'error'
      })

      return
    }

    return true
  }

  const handleFormSubmit = async () => {
    if (!validateForm()) return

    const payload = {
      username: values.username,
      email: values.email,
      password: values.password
    }

    // axios.post(`${API_URL}register`, payload)
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    try {
      const response = await postRequest('register', payload)
      console.log(response)
      setIsSubmitted(true)
      router.replace('/login')
    }
    catch (err) {
      setSnackbar({
        open: true,
        text: err[0],
        type: 'error'
      })
    }
  }

  return (
    <>
      <Collapse in={isSubmitted}>
        <Alert variant='filled' severity='success' style={{
          width: '100%',
          position: 'absolute',
          zIndex: 1000
        }}>Account Created Successfully.</Alert>
      </Collapse>
      <Snackbar
        open={snackbar.open}
        setOpen={(val) => setSnackbar({ ...snackbar, open: val })}
        type={snackbar.type}
        text={snackbar.text} />
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg
                width={35}
                height={29}
                version='1.1'
                viewBox='0 0 30 23'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                    <g id='logo' transform='translate(95.000000, 50.000000)'>
                      <path
                        id='Combined-Shape'
                        fill={theme.palette.primary.main}
                        d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                        transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                      />
                      <polygon
                        id='Rectangle'
                        opacity='0.077704'
                        fill={theme.palette.common.black}
                        points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                        transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.15'
                        fill={theme.palette.common.white}
                        d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                      />
                      <path
                        id='Rectangle'
                        fillOpacity='0.35'
                        fill={theme.palette.common.white}
                        transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                        d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Create New Account 🚀
              </Typography>
              <Typography variant='body2'>Manage your company from anywhere.</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
              <TextField autoFocus fullWidth id='username' label='Username' sx={{ marginBottom: 4 }} onChange={handleChange('username')} />
              <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} onChange={handleChange('email')} />
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-register-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <TextField fullWidth type={values.showPassword ? 'text' : 'password'} label='Confirm Password' sx={{ marginTop: 4 }} onChange={handleChange("confirmPassword")} />
              {/* <FormControlLabel
                control={<Checkbox />}
                label={
                  <Fragment>
                    <span>I agree to </span>
                    <Link href='/' passHref>
                      <LinkStyled onClick={e => e.preventDefault()}>privacy policy & terms</LinkStyled>
                    </Link>
                  </Fragment>
                }
              /> */}
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7, marginTop: 4 }} onClick={handleFormSubmit}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  Already have an account?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/login'>
                    <LinkStyled>Sign in instead</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
        <FooterIllustrationsV1 />
      </Box>
    </>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
