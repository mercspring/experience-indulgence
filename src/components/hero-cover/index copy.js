import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import "./style.css";
import NavBar from "../../components/navbar";
import {useTheme} from '@material-ui/core/styles';
import HeroCover from "../../components/hero-cover";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  heroCover: {
    
    backgroundColor: theme.palette.grey[800],
    justifyContent: "space-around"
   
  },
  
}));

export default function Home() {
  const theme = createMuiTheme();
  const classes = useStyles();
  return (

    // <div className = "photo-background">
    <div className="Home">
      <NavBar />
      {/* <img ></img> */}

      {/* <h1 style={{ color: `${theme.palette.secondary.dark}` }}> */}
        {/* Hello, welcome to Idulge Home Page! */}
      {/* </h1> */}
     <HeroCover/>
     <Grid container spacing={3} className={classes.heroCover}>
        <Grid item xs={6}>
        <h1>Box1</h1>
        </Grid>
        <Grid item xs={6} sm={6}>
        <h1>Box2</h1>
        </Grid>
        <Grid item xs={6} sm={6}>
        <h1>Box3</h1>
        </Grid>
        <Grid item xs={6} sm={3}>
         
        </Grid>
        <Grid item xs={6} sm={3}>
         
        </Grid>
        <Grid item xs={6} sm={3}>
         
        </Grid>
        <Grid item xs={6} sm={3}>
         
        </Grid>
      </Grid>

    
    </div>
    // </div>
    // <div className = "body">
    //   <footer/>
    // </div>
  );
}