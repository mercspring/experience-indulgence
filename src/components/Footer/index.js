// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import Container from '@material-ui/core/Container';
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
        container:{
                height:"480px",
                margin: "60px auto 60px"
        }
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function Feature() {
        const classes = useStyles();
	return (
        <Box color="primary">
            <Container maxWidth="lg">
                    <Grid container spacing={0} className={classes.container}>
                            <Grid item xs={3}>
                                <Typography variant="h4">
                                    Indulge
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <List>
                                    <ListItemLink href="/">
                                        <ListItemText primary="Home" />
                                    </ListItemLink>
                                    <ListItemLink href="">
                                        <ListItemText primary="Something" />
                                    </ListItemLink>
                                    <ListItemLink href="/signup">
                                        <ListItemText primary="Signup" />
                                    </ListItemLink>
                                </List>
                            </Grid>
                    </Grid>
            </Container>
        </Box>
	);
}

export default Feature;