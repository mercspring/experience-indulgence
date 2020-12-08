
// React
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fade, TextField, Grid, Paper, Button, FormGroup, Checkbox, FormControlLabel } from '@material-ui/core/';
// import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import Grid from "@material-ui/core/Grid"
// import Paper from '@material-ui/core/Paper';
// import Button from "@material-ui/core/Button"
// import FormGroup from '@material-ui/core/FormGroup';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// API
import axios from "axios";
import API from "../../utils/API"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "20px 0",
        padding: "20px"
    },
    grid: {
        marginBottom: "20px"
    }
}));

function Signup() {

    let [info, setInfo] = useState({ first: "", last: "", email: "", password: "", username: "", street: "", zipcode: "", state: "", city: "" });
    let [disableSubmit, setDisableSubmit] = useState(true);
    let history = useHistory();
    function onSubmit(event) {
        event.preventDefault();

        const payload = Object.assign(info, { contactInfo: { email: info.email } })
        API.createClient(payload)
            .then(result => {
                let userId = result.data._id
                console.log(history)
                history.push(`/client-profile/${userId}`);
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
    }
    function onInfoChange(event) {
        const { name, value } = event.target;
        setInfo({ ...info, [name]: value });
        if (info.first && info.last && info.email && info.password && info.username && info.street && info.zipcode && info.state && info.city) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }
    const classes = useStyles();

    return (
        <Fade in={true}>
            <Paper className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="h3" gutterBottom>
                            Sign Up
					</Typography>
                    </Grid>
                </Grid>
                <form noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Typography variant="h5" gutterBottom>
                                Account
						</Typography>
                            <Grid container spacing={1} className={classes.grid}>
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <TextField fullWidth label="Username" name="username" value={info.username} onChange={onInfoChange} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <TextField fullWidth type="password" label="Password" name="password" value={info.password} onChange={onInfoChange} />
                                </Grid>
                            </Grid>


                            <Typography variant="h5" gutterBottom>
                                Profile
						</Typography>
                            <Grid container spacing={1} className={classes.grid}>
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <TextField fullWidth label="First Name" name="first" value={info.first} onChange={onInfoChange} />
                                </Grid>
                                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <TextField fullWidth label="Last Name" name="last" value={info.last} onChange={onInfoChange} />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                                    <TextField fullWidth label="Email" name="email" value={info.email} onChange={onInfoChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>


                            </Grid>
                            <Typography variant="h5" gutterBottom>
                                Address
						</Typography>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <TextField fullWidth label="Address" name="street" value={info.street} onChange={onInfoChange} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <TextField fullWidth label="City" name="city" value={info.city} onChange={onInfoChange} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <TextField fullWidth label="State" name="state" value={info.state} onChange={onInfoChange} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <TextField fullWidth label="Zip" name="zipcode" value={info.zipcode} onChange={onInfoChange} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={disableSubmit} fullWidth variant="contained" color="primary" onClick={onSubmit}>Create Profile</Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Fade>
    );
}

export default Signup;