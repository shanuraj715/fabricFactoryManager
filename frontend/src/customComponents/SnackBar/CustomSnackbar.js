// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Grow from '@mui/material/Grow'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'
import Alert from '@mui/material/Alert'

const SlideTransition = props => {
    return <Slide {...props} direction='up' />
}

const SnackbarTransition = (props) => {

    const {
        open = false,
        setOpen = () => { },
        type="success",
        text = ''
    } = props

    const [transition, setTransition] = useState(Slide)
    const [messageInfo, setMessageInfo] = useState(undefined)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            key={transition.name}
            TransitionComponent={transition}
        >
            <Alert
                elevation={3}
                variant='filled'
                onClose={handleClose}
                severity={type}
            >
                {text}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarTransition
