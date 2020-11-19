// React
import React, { useState } from 'react'
// Styles
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// API
import API from '../../utils/API.js'

function SigninModal() {
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
            <TextField fullWidth label="username" name="username" value={userInfo.username} onChange={onInfoChange} />
            <TextField fullWidth label="password" name="password" value={userInfo.password} onChange={onInfoChange} />
            <Button onClick={onClick}>Login</Button>
        </div>
    )
}

export default SigninModal;