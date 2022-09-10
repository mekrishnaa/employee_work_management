import { Snackbar,Button } from "@material-ui/core";
import {useState} from 'react';

export const MatSnackBar = (props) =>{
    
    return (
        <>
            {/* <Button onClick={()=>setOpen(true)}>SUbmit</Button> */}
            <Snackbar
                message={props.message}
                autoHideDuration={4000}
                open={props.open}
                onClose={props.handleSnackBarClose}
            />
        </>
    )
}