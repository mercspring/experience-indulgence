// React
import React, { useState } from 'react'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// API
import API from '../../utils/API.js'

const useStyles = makeStyles((theme) => ({
    button:{
        marginTop: "20px"
    }
}));

function SigninModal(props) {
    const [userInfo, setUserInfo] = useState({ username: "", password: "", _id:"" });

    function onInfoChange(event) {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    function onClick(event) {
        event.preventDefault();
        API.login(userInfo).then(newToken => {
            localStorage.setItem("token", newToken.data.token)
            setUserInfo({ username: "", password: "", _id:"" });
            console.log(newToken.data);
            console.log(newToken.data._id);
            let userData = newToken.data._id
            props.history.push(`/profile/${userData}`);
            props.handleClose(false);
        })
    }
    
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4">
                Login
            </Typography>
            <form noValidate autoComplete="off">
                <TextField fullWidth label="username" name="username" value={userInfo.username} onChange={onInfoChange} />
                <TextField fullWidth label="password" name="password" value={userInfo.password} onChange={onInfoChange} />
                <Button className={classes.button} variant="contained" color="secondary" onClick={onClick}>Login</Button>
            </form>
        </div>
    )
}

export default SigninModal;