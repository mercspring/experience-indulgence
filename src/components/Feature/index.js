// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import { Typography, Box} from "@material-ui/core";
import { FilterNone, HowToVote, ViewHeadline } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
        image: {
              width: '100%',    
              height: "480px",
              borderRadius: "10px"
        },
        container:{
                margin: "60px 0",
                '&:nth-of-type(2)': {
                        display: "flex",
                        flexDirection: "row-reverse",
                }
        },
        center:{
                display: "flex",
                alignItems: "center",
                paddingRight: "20px",
                paddingBottom: "20px"
        }
}));

function Feature(props) {
        const classes = useStyles();
	return (
                <Grid container spacing={0} className={classes.container}>
                        <Grid className={classes.center} item xs={12} sm={12} md={6} lg={6} xl={6}>
                                <Box>
                                        <Typography variant="h3" gutterBottom>
                                                {props.props.title}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
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