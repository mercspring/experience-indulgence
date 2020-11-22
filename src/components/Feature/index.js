// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import { Typography, Box} from "@material-ui/core";
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
                borderRadius: "25px",
                display: "inline",
                alignItems: "center",
                padding:"20px"
        },
        container:{
                margin: "60px 0",
                width: "100%",
                display: "flex",
                '&:nth-of-type(2)': {
                        flexDirection: "row-reverse",
                }
        },
        center:{
                display: "flex",
                alignItems: "center",
        }
}));

function Feature(props) {
        const classes = useStyles();
	return (
                <Grid container spacing={1} className={classes.container}>
                        <Grid item className={classes.center} xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Box>
                                        <Typography variant="h3" align="center" gutterBottom>
                                                {props.props.title}
                                        </Typography>
                                        <Typography variant="subtitle1" align="justify"  gutterBottom>
                                                {props.props.description}
                                        </Typography> 
                                </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <img className={classes.image}src={props.props.imageUrl} alt={props.props.title}/>
                        </Grid>
                </Grid>
	);
}

export default Feature;