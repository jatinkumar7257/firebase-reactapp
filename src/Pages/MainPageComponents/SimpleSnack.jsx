import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SimpleSnack = (props) => {

    const handleCloseSimpleSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setSimpleSnacking({
            open: false,
            message: '',
            snackType: props.snackType
        });
    };

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={handleCloseSimpleSnack}
        >
            <Alert onClose={handleCloseSimpleSnack} severity={props.snackType} sx={{ width: '100%' }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}

export default SimpleSnack;