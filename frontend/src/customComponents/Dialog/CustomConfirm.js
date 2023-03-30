import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const dummyFunc = () => {}

export default function AlertDialog(props) {

    const {
        open = false, 
        setOpen = dummyFunc, 
        title = 'Dialog Title', 
        body = 'Dialog Body',  
        btn1Text = 'Button 1', 
        btn2Text = 'Button 2', 
        btn1OnClick = dummyFunc, 
        btn2OnClick = dummyFunc
    } = props

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={btn1OnClick}>{btn1Text}</Button>
                <Button onClick={btn2OnClick} autoFocus>
                    {btn2Text}
                </Button>
            </DialogActions>
        </Dialog>
    );
}