// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import { Typography, Box} from "@material-ui/core";
import { Palette } from "@material-ui/icons";
import { FilterNone, HowToVote, ViewHeadline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
        imageGrid: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                marginBottom: "20px"
        },
        image: {
                flexShrink: "0",
                minWidth: '100%',    
                minHeight: "100%",
                borderRadius: "10px",
                display: "inline",
                alignItems: "center",
        },
        container:{
                margin: "60px 0",
                width: "100%",
                display: "flex",
                '&:nth-of-type(2)': {
                        flexDirection: "row-reverse",
                }
                
        }
}));

function Feature(props) {
        const classes = useStyles();
	return (
                <Grid container spacing={2} justify="center" className={classes.container}>
                        <Grid className={classes.center} item xs={12} s={12} md={6}>
                                <Box>
                                        <Typography variant="h3" align="center" gutterBottom>
                                                {props.props.title}
                                        </Typography>
                                        <Typography variant="subtitle1" align="justify"  gutterBottom>
                                                {props.props.description}
                                        </Typography> 
                                </Box>
                        </Grid>
                        <Grid item xs={12} s={12} md={6} className={classes.imageGrid}>
                                <img className={classes.image}src={props.props.imageUrl} alt={props.props.title}/>
                        </Grid>
                </Grid>
	);
}

export default Feature;