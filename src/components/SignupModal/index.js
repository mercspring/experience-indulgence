import React from 'react'
import { Grid, Button, Typography, Container, Divider, makeStyles } from '@material-ui/core/';

export default function SignupModal() {
    const useStyles = makeStyles((theme) => ({
        gridItem: {
            padding: "1em"
        },
        descriptionList: {
            minHeight: "7em",
        },
        listItem: {
            listStyleType: "circle",
            listStylePosition: "inside"
        }
    }));
    const classes = useStyles();
    return (
        <div>

            <Typography variant="h4" color="inherit" gutterBottom>
                Signup
                </Typography>
            <Grid container>
                <Grid md={5} className={classes.gridItem}>
                    <Typography variant="h6"> Chefs </Typography>
                    <ul className={classes.descriptionList}>
                        <li className={classes.listItem}>Show off pictures of your food</li>
                        <li className={classes.listItem}>Connect with potenail clients</li>

                    </ul>
                    <Button href="/Signup" color="primary" className={classes.button} variant="contained" > Signup </Button>
                </Grid>
                <Divider orientation="vertical" flexItem fullWidth />
                <Grid md={6} className={classes.gridItem}>
                    <Typography variant="h6"> Clients </Typography>
                    <ul className={classes.descriptionList}>
                        <li className={classes.listItem}>Find chefs to cook delicous meals</li>
                        <li className={classes.listItem}>Support the culinary community</li>
                    </ul>
                    <Button href="/client-signup" color="primary" className={classes.button} variant="contained" > Signup </Button>
                </Grid>
            </Grid>
        </div>
    )
}
