import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import CloseIcon from '@material-ui/icons/Close'
import DonateDialog from './DonateDialog'

export default function DonateSnackbar() {
    const [open, setOpen] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(true)

    const disableSnackbar = () => {
        setSnackbarOpen(false)
        localStorage.setItem('snackbarIsClosed', true)
    }

    return (
        <>
            {open && <DonateDialog onClose={() => setOpen(false)} />}

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                onClose={disableSnackbar}
                message="Donate?"
                action={
                    <>
                        <Button style={{ marginRight: '10px' }} color="secondary" size="small" onClick={() => {
                            setOpen(true)
                            disableSnackbar()
                        }}>
                            <CreditCardIcon style={{ marginRight: '10px' }} fontSize="small" />
                            Support
                        </Button>

                        <IconButton size="small" aria-label="close" color="inherit" onClick={disableSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            />
        </>
    )
}