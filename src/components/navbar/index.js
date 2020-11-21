// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Styles
import { makeStyles, IconButton, Drawer, Typography } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SigninModal from "../SigninModal";
import Modal from '@material-ui/core/Modal';
import "./style.css"
import { Slide, useScrollTrigger } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  space: {
    flexGrow: 1,
  },
  modal: {
	display: 'flex', 
	alignItems: 'center',
	justifyContent: 'center',
  },
  barBtn: {
	float: "right"
  },
  paper: {
	color: '#D4AF37',
	outline: 'none',
	position: 'absolute',
	backgroundColor: '#3b4045',
	boxShadow: theme.shadows[5],
	padding: theme.spacing(2),
	maxWidth: "90vw"
  },
  toolbar: {
	width: "100%",
	margin: "0 auto",
	padding: "1vh 5vw"
  },
  drawerItem: {
	margin: "1vh 5vw",
	color: "#D4AF37"
  },
  mobileHidden: {
	[theme.breakpoints.down('sm')]: {
		display: "none"
	}
  },
  mobileMenu: {
	display: "none",
	[theme.breakpoints.down('sm')]: {
		display: "block"
	}
  }
}));

function HideOnScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger();
  
	return (
	  <Slide appear={false} direction="down" in={!trigger}>
		{children}
	  </Slide>
	);
  }

function Navbar(props) {

	const [drawerOpen, setDrawerOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	}

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	}

  	let history = useHistory();

	const [loggedUser, setLoggedUser] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("userData")) {
			setLoggedUser(true);
		}
	}, [loggedUser])

	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

	const handleSignout = () => {
		localStorage.removeItem("userData");
		history.push("/");
		setDrawerOpen(false);
		setLoggedUser(false);
	}

	const classes = useStyles();
	return (
		<div>
			<div className={classes.root}>
				<HideOnScroll {...props}>
					<AppBar position="fixed" elevation={1}>
						<Toolbar className={classes.toolbar}>
								<Link underline="none" color="inherit" href="/" >
									<Typography variant="h5">
										Indulge
									</Typography>
								</Link>
								<div className={classes.space}></div>
							<span className={classes.mobileHidden}>
							<Button href="/search" color="inherit">Search</Button>
							{
								loggedUser ?
								
								<React.Fragment>
									<Button href={`/profile/${JSON.parse(localStorage.getItem("userData"))._id}`} color="inherit">Profile</Button>
									<Button href="/" color="inherit" onClick={handleSignout}>Signout</Button>
								</React.Fragment>
								:
								<React.Fragment>
									<Button href="/signup" color="inherit">Signup</Button>
									<Button onClick={handleOpen} color="inherit">Login</Button>
								</React.Fragment>
							}
							</span>
								<IconButton
									color="inherit"
									edge="end"
									onClick={handleDrawerOpen}
									className={classes.mobileMenu}
								>
									<MenuIcon />
								</IconButton>
						</Toolbar>
					</AppBar>
				</HideOnScroll>
				<Drawer
					anchor="right"
					open={drawerOpen}
					onClose={handleDrawerClose}
				>
					{
						loggedUser ?
						
						<React.Fragment>
							<Button className={classes.drawerItem} href="/search" color="inherit">Search</Button>
							<Button className={classes.drawerItem} href={`/profile/${JSON.parse(localStorage.getItem("userData"))._id}`} color="inherit">Profile</Button>
							<Button className={classes.drawerItem} color="inherit" onClick={handleSignout}>Signout</Button>
						</React.Fragment>
						:
						<React.Fragment>
							<Button className={classes.drawerItem} href="/search" color="inherit">Search</Button>
							<Button className={classes.drawerItem} onClick={handleOpen} color="inherit">Login</Button>
							<Button className={classes.drawerItem} href="/signup" color="inherit">Signup</Button>
						</React.Fragment>
					}
				</Drawer>
			</div>
				<Modal
					className={classes.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
				>

				<Slide direction="down" in={open}>
					<div className={classes.paper}>
						<SigninModal handleClose={setOpen} setDrawerOpen={setDrawerOpen} history={history} setLoggedUser={setLoggedUser} />
					</div>
				</Slide>

				</Modal>
		</div>
	);
}

export default Navbar;