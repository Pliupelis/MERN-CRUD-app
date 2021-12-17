import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';
import { Navigate } from 'react-router';
import { signIn } from '../../store/actions/authActions'
const SignIn = () =>{

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [creds, setCreds] = useState({
        email: "",
        password: "",

    })

    if(auth._id) return <Navigate to="/" />

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(signIn(creds))
        setCreds({
            email: "",
            password: ""
        })
    }

    return (
    <>
        <form noValidate autoComplete="off" onSubmit = {handleSubmit}>
            <Typography variant="h5" > SignIN</Typography>
            <TextField 
                id="enter-email"
                label="enterEmail"
                variant="outlined"
                fullWidth
                value = {creds.email}
                onChange = {(e)=>setCreds({...creds, email: e.target.value})}
            />
                        <TextField 
                id="enter-password"
                type="password"
                label="enterPassword"
                variant="outlined"
                fullWidth
                value = {creds.password}
                onChange = {(e)=>setCreds({...creds, password: e.target.value})}
            />
            <Button variant="outlined" color="primary" type="submit">
                SignIN
            </Button>
        </form>
    </>
    )
}
export default SignIn