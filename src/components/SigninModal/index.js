// React
import React, { useState } from 'react'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// API
import API from '../../utils/API.js'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button:{
        marginTop: "20px"
    }
}));

function SigninModal() {
    const classes = useStyles();

    const [userInfo, setUserInfo] = useState({ username: "", password: "" });

    function onInfoChange(event) {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    function onClick(event){
        event.preventDefault()
        API.login(userInfo).then(newToken=> {
            console.log(newToken.data.token);
            localStorage.setItem("token", newToken.data.token)
            setUserInfo({ username: "", password: "" });
        })
    }

    return (
        <div>
            <Typography variant="h4">
                Login
            </Typography>
            <TextField fullWidth label="username" name="username" value={userInfo.username} onChange={onInfoChange} />
            <TextField fullWidth label="password" name="password" value={userInfo.password} onChange={onInfoChange} />
            <Button className={classes.button} variant="contained" color="secondary" onClick={onClick}>Login</Button>
        </div>
    )
}

export default SigninModal;