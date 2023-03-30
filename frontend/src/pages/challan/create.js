import React, { useState, forwardRef } from 'react'


import {
    Card,
    CardHeader,
    Typography,
    CardContent,
    Grid,
    TextField,
    Divider,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
    CardActions,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody,
    Paper,
    Box
} from '@mui/material'

import convert from 'src/functions/convert'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import DatePicker from 'react-datepicker'

import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'

const createData = (no, weight) => {
    return {
        no,
        weight: weight
    }
}



function Create(props) {



    // console.log(settings, save)

    // ** States
    const [date, setDate] = useState(new Date().getTime())
    const [itemValue, setItemValue] = useState('')
    const [data, setData] = useState([])

    const CustomInput = forwardRef((props, ref) => {
        return <TextField fullWidth {...props} inputRef={ref} label='Challan Date' autoComplete='off' value={convert('(d) x/n/Y', date)} />
    })

    const rows = data.map((obj, index) => createData(index + 1, obj.weight))

    const handleItemEntry = e => {
        e.preventDefault()
        if (!itemValue || !(itemValue * 1)) return
        setData([...data, { weight: itemValue * 1 }])
        setItemValue('')
    }

    const handleItemOnChange = e => {
        const val = e.target.value
        if (!isNaN(val)) setItemValue(val)
    }

    const handleDeleteLastAddedItem = () => {
        const items = [...data]
        items.pop()
        setData(items)
    }

    const renderTable = () => {
        return <TableContainer component={Paper}>
            <Table sx={{ minWidth: 260 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell >Weight (Kg.)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.reverse().map(row => (
                        <TableRow
                            key={row.no}
                            sx={{
                                '&:last-of-type td, &:last-of-type th': {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell component='th' scope='row'>
                                {row.no}
                            </TableCell>
                            <TableCell >{row.weight} Kg.</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    }

    return (
        <>


            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h5' sx={{ marginBottom: 2 }}>Create Challan</Typography>
                    <Card>
                        <CardHeader title='Challan Number: 582' titleTypographyProps={{ variant: 'h6' }} />
                        <Divider sx={{ margin: 0 }} />
                        <form onSubmit={e => e.preventDefault()}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                            Details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label='To M/s.' placeholder='Raj Fabrics' />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DatePickerWrapper>
                                            <DatePicker
                                                selected={date}
                                                showYearDropdown
                                                showMonthDropdown
                                                placeholderText='MM-DD-YYYY'
                                                customInput={<CustomInput />}
                                                id='form-layouts-separat'
                                                onChange={date => setDate(new Date(date).getTime())}
                                            />
                                        </DatePickerWrapper>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField fullWidth label='GSTIN' placeholder='Enter GST Number' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth type='text' label='Comment' placeholder='Plane / Dot / Net / etc...' />
                                    </Grid>

                                </Grid>
                            </CardContent>
                        </form>
                    </Card>

                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardHeader
                            title='Weight in Kg.'
                            titleTypographyProps={{
                                sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                            }}
                            action={
                                <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                                </IconButton>
                            }
                        />
                        <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
                            <form onSubmit={handleItemEntry}>
                                <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
                                    <TextField fullWidth type='text' pattern="\d*" label='Weight' placeholder='' onChange={handleItemOnChange} value={itemValue} />
                                </Box>
                                <Button xs={8} size='large' type='submit' sx={{ mr: 2, mb: 2 }} variant='contained'>
                                    Add Item
                                </Button>
                                <Button size='large' color='error' variant='outlined' sx={{ mb: 2 }} onClick={handleDeleteLastAddedItem}>
                                    Delete Last Added
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                {data.length > 0 && <Grid item xs={12}>
                    <Card>
                        <CardHeader title={`Items: ${rows.length} | Weight: ${rows.reduce((acc, val) => acc + val.weight, 0)} Kg.`} titleTypographyProps={{ variant: 'h6' }} />
                        <CardContent>
                            {renderTable()}
                        </CardContent>
                    </Card>
                </Grid>}
            </Grid>
        </>
    )
}

export default Create