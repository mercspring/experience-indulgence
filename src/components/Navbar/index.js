// React
import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
// Styles
import { makeStyles, IconButton, Drawer, Typography, Container, } from '@material-ui/core/';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SigninModal from "../SigninModal";
import SignupModal from "../SignupModal";
import Modal from '@material-ui/core/Modal';
import { Slide, useScrollTrigger } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import "./style.css"

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
		maxWidth: "90vw",
		minWidth: "40vw",
		minHeight: "20vw"
	},
	toolbar: {
		width: "100%",
		margin: "0 auto"
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
	},
	font: {
		fontFamily: "'Italianno', cursive",
		fontSize: "3em"
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
	const [userType, setUserType] = useState("");

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
			if (JSON.parse(localStorage.getItem("userData")).userType === "chef"){
				setUserType("chef");
			} else {
				setUserType("client");
			}
		}
	}, [loggedUser])

	const [openSignin, setOpenSignin] = useState(false);
	const [openSignup, setOpenSignup] = useState(false);

	const handleOpen = (type) => {
		if (type === "signin") {
			setOpenSignin(true);
		} else {
			setOpenSignup(true);
		}
	};
	const handleClose = (type) => {
		if (type === "signin") {
			setOpenSignin(false);
		} else {
			setOpenSignup(false);
		}
	};

	const handleSignout = (type) => {
		localStorage.removeItem("userData");
		setDrawerOpen(false);
		setLoggedUser(false);
		<Redirect to="/" />
	}

	function checkUsers() {
			console.log(userType, loggedUser)
		if (loggedUser && (userType === "chef")) {
			return (<React.Fragment>
				<Button href={`/profile/${JSON.parse(localStorage.getItem("userData"))._id}`} color="inherit">Profile</Button>
				<Button href="/" color="inherit" onClick={handleSignout}>Signout</Button>
			</React.Fragment>)
		} else if (loggedUser && (userType === "client")) {
			return (<React.Fragment>
				<Button href={`/client-profile/${JSON.parse(localStorage.getItem("userData"))._id}`} color="inherit">Profile</Button>
				<Button href="/" color="inherit" onClick={handleSignout}>Signout</Button>
			</React.Fragment>)
		} else {
			return (<React.Fragment>
				<Button onClick={() => { handleOpen("signup") }} color="inherit">Signup</Button>
				<Button onClick={() => { handleOpen("signin") }} color="inherit">Login</Button>
			</React.Fragment>)
		}
	}

	const classes = useStyles();
	return (
		<div>
			<div className={classes.root}>
				<HideOnScroll {...props}>
					<AppBar position="fixed" elevation={1}>
						<Container maxWidth="lg">
							<Toolbar className={classes.toolbar} disableGutters>
								<Link underline="none" color="inherit" href="/" >
									<Typography className={classes.font} variant="h5">
										Indulge
										</Typography>
								</Link>
								<div className={classes.space}></div>
								<span className={classes.mobileHidden}>
									<Button href="/search" color="inherit">Search</Button>
									{
										// loggedUser ?
										checkUsers()

										// <React.Fragment>
										// 	<Button href={`/profile/${JSON.parse(localStorage.getItem("userData"))._id}`} color="inherit">Profile</Button>
										// 	<Button href="/" color="inherit" onClick={handleSignout}>Signout</Button>
										// </React.Fragment>
										// :
										// <React.Fragment>
										// 	{/* <Button href="/signup" color="inherit">Signup</Button> */}
										// 	<Button onClick={() => {handleOpen("signup")}} color="inherit">Signup</Button>
										// 	<Button onClick={() => {handleOpen("signin")}} color="inherit">Login</Button>
										// </React.Fragment>
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
						</Container>
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
				open={openSignin}
				onClose={() => { handleClose("signin") }}
				closeAfterTransition
			>

				<Slide direction="down" in={openSignin}>
					<div className={classes.paper}>
						<SigninModal setUserType={setUserType} handleClose={setOpenSignin} setDrawerOpen={setDrawerOpen} history={history} setLoggedUser={setLoggedUser} />
					</div>
				</Slide>

			</Modal>
			<Modal
				className={classes.modal}
				open={openSignup}
				onClose={() => { handleClose("signup") }}
				closeAfterTransition
			>

				<Slide direction="down" in={openSignup}>
					<div className={classes.paper}>
						<SignupModal />
						{/* <SigninModal handleClose={setOpenSignup} setDrawerOpen={setDrawerOpen} history={history} setLoggedUser={setLoggedUser} /> */}
					</div>
				</Slide>

			</Modal>
		</div>
	);
}

export default Navbar;