// React
import React, { useState } from 'react'
// Styles and Material UI components
import { Box, Typography, makeStyles, TextField, Button, Grow, Grid, Divider } from '@material-ui/core';
// API
import API from '../../utils/API.js'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: "20px 0"
    },
    box: {
        backgroundColor: "rgba(244, 143, 177, 0)"
    },
    inputText: {
        color: "#f5f5f5"
    },
    form: {
        padding: "1em"
    }

}));

function SigninModal(props) {
    const [chefInfo, setChefInfo] = useState({ username: "", password: "", _id: "" });
    const [clientInfo, setClientInfo] = useState({ username: "", password: "", _id: "" });

    const [validUser, setValidUser] = useState(true)

    function onInfoChange(event, type) {
        const { name, value } = event.target;
        if (type === "chef") {
            setChefInfo({ ...chefInfo, [name]: value });
        } else {
            setClientInfo({ ...clientInfo, [name]: value });
        }
        if (!validUser) {
            setValidUser(true);
        }
    }

    function onSubmitClient(event) {
        event.preventDefault();
        API.clientLogin(clientInfo).then(res => {
            console.log(res.data);
            localStorage.setItem("userData", JSON.stringify(res.data));
            setClientInfo({ username: "", password: "", _id: "" });
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
    function onSubmitChef(event) {
        event.preventDefault();
        API.login(chefInfo).then(res => {
            console.log(res.data);
            localStorage.setItem("userData", JSON.stringify(res.data));
            setChefInfo({ username: "", password: "", _id: "" });
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
            <Box>
                <Typography variant="h4" color="inherit" gutterBottom>
                    Login
                </Typography>
            </Box>
            <Grid container={true}>
                <Grid md={5} alignItems="center">
                    <form autoComplete="off" onSubmit={onSubmitClient} className={classes.form}>
                        <Typography variant="h6" color="inherit">User Login</Typography>
                        <TextField color="secondary" InputProps={{ className: classes.inputText }} error={!validUser} label="username" name="username" value={clientInfo.username} onChange={ event => onInfoChange(event,"client")} /> <br />
                        <TextField color="secondary" InputProps={{ className: classes.inputText }} error={!validUser} type="password" label="password" name="password" value={clientInfo.password} onChange={event => onInfoChange(event,"client")} /> <br />
                        <Button className={classes.button} variant="contained" type="submit" color="primary">Login</Button>
                    </form>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid md={5}>
                    <form autoComplete="off" onSubmit={onSubmitChef} className={classes.form}>
                        <Typography variant="h6" color="inherit">Chef Login</Typography>
                        <TextField color="secondary" InputProps={{ className: classes.inputText }} error={!validUser} label="username" name="username" value={chefInfo.username} onChange={event => onInfoChange(event, "chef")} /> <br />
                        <TextField color="secondary" InputProps={{ className: classes.inputText }} error={!validUser} type="password" label="password" name="password" value={chefInfo.password} onChange={event => onInfoChange( event, "chef")} /> <br />
                        <Button className={classes.button} variant="contained" type="submit" color="primary">Login</Button>
                    </form>
                </Grid>
            </Grid>
            <Grow in={!validUser}>
                <Box p={0.15} mb={0.5} border={1} borderRadius={2} className={classes.box} borderColor="error.main" color="error.main">
                    <Typography variant="body2">
                        * Incorrect log-in information
                    </Typography>
                </Box>
            </Grow>
        </div >
    )
}

export default SigninModal;