import { useState, useEffect, forwardRef } from 'react'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import Dialog from 'src/customComponents/Dialog/CustomConfirm'
import Alert from '@mui/material/Alert'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
    return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const ProfileEdit = () => {

    const { settings } = useSettings()
    const router = useRouter()

    const [language, setLanguage] = useState([])
    const [date, setDate] = useState(null)

    const [form1Data, setForm1Data] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        gender: '',
        mobile:'', 
        gstin: ''
    })

    const [form2Data, setForm2Data] = useState({
        oldPassword: '',
        password: '',
        password2: '',
        showPassword: false,
    })

    const handleForm1Change = prop => e => {
        setForm1Data({...form1Data, [prop]: e.target.value})
    }

    const handleForm2Change = prop => e => {
        setForm2Data({...form1Data, [prop]: e.target.value})
    }

    // Handle Password
    const handlePasswordChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setForm2Data({ ...form2Data, showPassword: !form2Data.showPassword })
    }

    const handleMouseDownPassword = event => {
        event.preventDefault()
    }

    // Handle Confirm Password
    const handleConfirmChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleClickShowConfirmPassword = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 })
    }

    const handleMouseDownConfirmPassword = event => {
        event.preventDefault()
    }

    // Handle Select
    const handleSelectChange = event => {
        setLanguage(event.target.value)
    }

    const handleOnSelect = prop => event => {
        // setLanguage(event.target.value)
        console.log(event.target.value)
    }

    // useEffect(() => {
    //   if (!settings.user.isLoggedIn) router.replace('/login')
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [settings.user.isLoggedIn])

    return (
        <>
            <Card sx={{ marginBottom: 5 }}>
                <form onSubmit={e => e.preventDefault()}>
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                    Personal Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='First Name' placeholder='First Name' value={form1Data.firstName} onChange={handleForm1Change('firstName')} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Last Name' placeholder='Last Name' value={form1Data.lastName} onChange={handleForm1Change('lastName')} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Username' placeholder='Username' disabled value={form1Data.username} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type="email" label='Email' placeholder='Email' disabled value={form1Data.email} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id='form-layouts-separator-select-label'>Gender</InputLabel>
                                    <Select
                                        label='Country'
                                        defaultValue={form1Data.gender}
                                        onChange={handleOnSelect('gender')}
                                        id='form-layouts-separator-select'
                                        labelId='form-layouts-separator-select-label'
                                    >
                                        <MenuItem value='Male'>Male</MenuItem>
                                        <MenuItem value='Female'>Female</MenuItem>
                                        <MenuItem value='Other'>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='Phone No.' placeholder='Phone Number' value={form1Data.mobile} onChange={handleForm1Change('mobile')} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label='GSTIN' placeholder='GST Number'  value={form1Data.gstin} onChange={handleForm1Change('gstin')} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions>
                        <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                            Save Details
                        </Button>
                        {/* <Button size='large' color='secondary' variant='outlined'>
                            Cancel
                        </Button> */}
                    </CardActions>
                </form>
            </Card>



            <Card>
                <form onSubmit={e => e.preventDefault()}>
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                    Password Management
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label='Old Password' type="password" placeholder='Enter old password to change your password' />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor='form-layouts-separator-password'>New Password</InputLabel>
                                    <OutlinedInput
                                        label='Password'
                                        value={form2Data.password}
                                        id='form-layouts-separator-password'
                                        onChange={handleForm2Change('password')}
                                        type={form2Data.showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    edge='end'
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    aria-label='toggle password visibility'
                                                >
                                                    {form2Data.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth type={form2Data.showPassword ? 'text' : 'password'} label='Confirm Password' placeholder='Confirm New Password' value={form1Data.password2} onChange={handleForm2Change('password2')} />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider sx={{ margin: 0 }} />
                    <CardActions>
                        <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
                            Update Password
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </>
    )
}

export default ProfileEdit
