import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import "./style.css";
import NavBar from "../../components/navbar";
import {useTheme} from '@material-ui/core/styles';

export default function Home() {
  const theme = createMuiTheme();
  return (
    <div className="Home">
      <NavBar />

      <h1 style={{ color: `${theme.palette.secondary.dark}` }}>
        {/* Hello, welcome to Idulge Home Page! */}
      </h1>
     
    
    </div>
  );
}