// React

import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"

// Styles
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SigninModal from "../SigninModal";
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
	position: 'absolute',
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[5],
	padding: theme.spacing(2),
	top: "40%",
	left: "50%",
	transform: "translate(-50%, -40%)",
  },
  toolbar:{
	width: "1280px",
	margin: "0 auto",
	padding:"0 60px"
  }
}));

function Navbar(props) {

  let history = useHistory();
	console.log(history);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

	let loginBtn;
	let signupBtn;
	let loggedIn;
	let id = localStorage.getItem("id")
	let username = localStorage.getItem("username")
	let idUrl = "/profile/" + id
	if(id){
		loggedIn = 	<Button href={idUrl} color="inherit">{username}</Button>
	} else {
		signupBtn = <Button href="/signup" color="inherit">Signup</Button>;
		loginBtn = <Button onClick={handleOpen} color="inherit">Login</Button>;
	}

	const classes = useStyles();
	return (
		<div>
			<div className={classes.root}>
				<AppBar position="fixed" elevation="1">
						<Toolbar className={classes.toolbar}>
							<Link underline="none" color="inherit" variant="h5" href="/" className={classes.title}>
								Indulge
							</Link>
							<Button href="/search" color="inherit">Search</Button>
							{loggedIn}
							{loginBtn}
							{signupBtn}
						</Toolbar>
				</AppBar>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<div className={classes.paper}>
					<SigninModal handleClose={setOpen} history={history}/>
				</div>
			</Modal>
		</div>
	);
}

export default Navbar;