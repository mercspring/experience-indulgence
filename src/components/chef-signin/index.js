import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../../utils/API.js'

export default function ChefSignin() {
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });

    function onInfoChange(event) {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    function onClick(event){
        setUserInfo({ username: "", password: "" });
    }

    return (
        <div>
            <TextField style={{width:300}} label="username" name="username" value={userInfo.username} onChange={onInfoChange} /><br />
            <TextField style={{width:300}} label="password" name="password" value={userInfo.password} onChange={onInfoChange} /><br />
            <Button onClick={onClick}>Login</Button>


        </div>
    )
}
