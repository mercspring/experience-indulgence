// React
import React, { useState } from 'react'
// Styles and Material UI components
import { Box, Typography, makeStyles, TextField, Button, Grow } from '@material-ui/core';
// API
import API from '../../utils/API.js'


const useStyles = makeStyles((theme) => ({
    button:{
        marginTop: "20px"
    },
    box: {
        backgroundColor: "rgba(244, 143, 177, 0.1)"
    },
    inputText: {
        color: "#f5f5f5"
    }
}));

function SigninModal(props) {
    const [userInfo, setUserInfo] = useState({ username: "", password: "", _id:"" });
    const [validUser, setValidUser] = useState(true)

    function onInfoChange(event) {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
        if (!validUser) {
            setValidUser(true);
        }
    }

    function onSubmit(event) {
        event.preventDefault();
        API.login(userInfo).then(res => {
            console.log(res.data);
            localStorage.setItem("userData", JSON.stringify(res.data));
            setUserInfo({ username: "", password: "", _id:"" });
            console.log(res.data._id);
            let userId = res.data._id
            props.history.push(`/profile/${userId}`);
            props.setLoggedUser(true);
            props.handleClose(false);
            props.setDrawerOpen(false);
        }).catch(err => {
            setValidUser(false)
        })
    }
    
    const classes = useStyles();
    return (
        <div>
            <Box mb={1}>
                <Typography variant="h4">
                    Login
                </Typography>
            </Box>
            
            <Grow in={!validUser}>
                <Box p={0.15} mb={0.5} border={1} borderRadius={2} className={classes.box} borderColor="error.main" color="error.main">
                    <Typography variant="body2">
                        * Incorrect log-in information
                    </Typography>
                </Box>
            </Grow>
            
            <form autoComplete="off" onSubmit={onSubmit}>
                <TextField InputProps={{className : classes.inputText}} fullWidth error={!validUser} label="username" name="username" value={userInfo.username} onChange={onInfoChange} />
                <TextField fullWidth error={!validUser} type="password" label="password" name="password" value={userInfo.password} onChange={onInfoChange} />
                <Button className={classes.button} variant="contained" type="submit" color="secondary">Login</Button>
            </form>
        </div>
    )
}

export default SigninModal;