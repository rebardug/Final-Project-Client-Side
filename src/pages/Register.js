import API from '../api'
import ErrorDialog from '../components/ErrorDialog'
import SuccessDialog from '../components/SuccessDialog'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LockOutlined } from '@material-ui/icons'
import { Avatar, Container, TextField, Typography, Grid, Button, Paper, Tabs, Tab } from '@material-ui/core'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        opacity: '100%'
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    tab: {
        minWidth: 90
    }
}))


export default function Signup(props) {
    const classes = useStyles()
    const history = useHistory()

    const initialDialogState = {
        open: false,
        header: '',
        message: ''
    }

    const [errorDialog, setErrorDialog] = useState(initialDialogState)
    const [successDialog, setSuccessDialog] = useState(initialDialogState)

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        userType: "user"
    })

    const [userPoints, setUserPoints] = useState({
        points: 0
    })
    // const [userAddress, setUserAddress] = useState({
    //     city: '',
    //     street: '',
    //     houseNumber: 0
    // })

    const inputChanged = (key, value) => {
        setUserDetails(state => ({
            ...state,
            [key]: value
        }))
    }

    const pointsChanged = (key, value) => {
        setUserPoints(state => ({
            ...state,
            [key]: value
        }))
    }


    const signup = async () => {

        if (Object.values(userDetails).some(val => val === '') || Object.values(userPoints).some(val => val === '')) {
            console.log(Object.values(userDetails));
            return setErrorDialog({
                open: true,
                header: "missing fields",
                message: 'please fill all fields'
            })
        }

        if ((await API.validPoints(userPoints.points)) === false) {
            return setErrorDialog({
                open: true,
                header: "Something went wrong",
                message: "wrong points"
            })
        }

        // if (await API.userExists(userDetails.email)) {
        //     return setErrorDialog({
        //         open: true,
        //         header: "Something went wrong",
        //         message: 'email alredy exists'
        //     })
        // }

        try{
            await API.register({ ...userDetails, points: userPoints })
        }catch (error) {
                return setErrorDialog({
                open: true,
                header: "error",
                message:error.response.data.error
            })
        }


        return setSuccessDialog({
            open: true,
            header: "Welcome!",
            message: "User added successfully"
        })


    }

    return (
        <Container component='main' maxWidth='sm' >
            <ErrorDialog
                open={errorDialog.open}
                error={errorDialog.message}
                header={errorDialog.header}
                close={() => setErrorDialog({ open: false, header: '', message: '' })}
            />
            <SuccessDialog
                open={successDialog.open}
                message={successDialog.message}
                header={successDialog.header}
                close={() => {
                    setSuccessDialog({ open: false, header: '', message: '' })
                    history.push('/')
                }}
            />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component='h1' variant='h5' style={{
                    }}>
                    register
                </Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                label='name'
                                autoFocus
                                value={userDetails.name}
                                onChange={event => inputChanged('name', event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                label='phone number '
                                autoFocus
                                value={userDetails.phone}
                                onChange={event => inputChanged('phone', event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="email"
                                label="Email"
                                id="email"
                                value={userDetails.email}
                                onChange={event => inputChanged('email', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="password"
                                type="password"
                                id="password"
                                value={userDetails.password}
                                onChange={event => inputChanged('password', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="נקודות"
                                value={userPoints.points}
                                onChange={event => pointsChanged('points', event.target.value)}
                            />
                        </Grid>
                        {/* <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="street"
                                value={userStreet.street}
                                onChange={event => addressChanged('street', event.target.value)}
                            />
                        </Grid> */}
                        {/* <Grid item xs={4}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                type='number'
                                label="number"
                                value={userPoints.houseNumber}
                                onChange={event => addressChanged('houseNumber', event.target.value)}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <Grid container justifyContent='center' >
                                <Tabs value={userDetails.userType === 'admin' ? 1 : 0} centered >
                                    <Tab label='user' onClick={() => inputChanged('userType', 'user')}
                                        className={classes.tab} >

                                    </Tab>
                                    <Tab label='Admin' onClick={() => inputChanged('userType', 'admin')}
                                        className={classes.tab} >

                                    </Tab>

                                </Tabs>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        onClick={signup}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{
                                      }}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Link component={Button} to='/login'>
                                {"Already have an account?"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}