import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import API from '../../utils/API.js'

export default function ChefSignin(props) {
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });

    function onInfoChange(event) {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    function onClick(event) {
        event.preventDefault();
        API.login(userInfo).then(res => {
            console.log(res.data);
            localStorage.setItem("userData", JSON.stringfiy(res.data));
            setUserInfo({ username: "", password: "" });
            props.handleClose();
        })
    }

    return (
            <div style={{ width: 320, height: 150, backgroundColor:"gray", padding:"10px", borderRadius:"5px"}}>
                <TextField style={{ width: 300 }} label="username" name="username" value={userInfo.username} onChange={onInfoChange} /><br />
                <TextField style={{ width: 300 }} label="password" name="password" value={userInfo.password} onChange={onInfoChange} /><br />
                <Button style={{marginTop:"5px"}}onClick={onClick}>Login</Button>
            </div>
    )
}
