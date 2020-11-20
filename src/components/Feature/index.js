// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import { Typography } from "@material-ui/core";
import { Palette } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
        image: {
              width: '100%',
              height: "480px"
        },
        container:{
                // Palette:  theme.palette.primary.light,
                height:"480px",
                margin: "60px 0"
        }
}));

function Feature(props) {
        const classes = useStyles();
	return (
                <Grid container className={classes.container}>
                        <Grid item xs={6}>
                                <Typography variant="h3" gutterBottom>
                                        {props.props.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                        {props.props.description}
                                </Typography> 
                        </Grid>
                        <Grid item xs={6}>
                                <img className={classes.image}src={props.props.imageUrl} alt={props.props.title}/>
                        </Grid>
                </Grid>
	);
}

export default Feature;