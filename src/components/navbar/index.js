// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SigninModal from "../SigninModal";
import Modal from '@material-ui/core/Modal';
import { Slide, useScrollTrigger } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  modal: {
	display: 'flex', 
	alignItems: 'center',
	justifyContent:'center',
  },
  paper: {
	outline: 'none',
	position: 'absolute',
	backgroundColor: theme.palette.background.paper,
	boxShadow: theme.shadows[5],
	padding: theme.spacing(2),
	maxWidth: "90vw"
  },
  toolbar:{
	width: "100%",
	margin: "0 auto",
	paddingLeft: "5vw",
	paddingRight: "5vw"
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
		setLoggedUser(false);
	}

	const classes = useStyles();
	return (
		<div>
			<div className={classes.root}>
				<HideOnScroll {...props}>
					<AppBar position="fixed" elevation={1}>
							<Toolbar className={classes.toolbar}>
								<Link underline="none" color="inherit" variant="h5" href="/" className={classes.title}>
									Indulge
								</Link>
								<Button href="/search" color="inherit">Search</Button>
								{
									loggedUser ?
									
									<React.Fragment>
										<Button href="/profile" color="inherit">Hello {JSON.parse(localStorage.getItem("userData")).first}!</Button>
										<Button href="/" color="inherit" onClick={handleSignout}>Signout</Button>
									</React.Fragment>
									:
									<React.Fragment>
										<Button href="/signup" color="inherit">Signup</Button>
										<Button onClick={handleOpen} color="inherit">Login</Button>
									</React.Fragment>
								}
							</Toolbar>
					</AppBar>
				</HideOnScroll>
			</div>
				<Modal
					className={classes.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
				>

					<Slide direction="down" in={open}>
						
						<div className={classes.paper}>
							<SigninModal handleClose={setOpen} history={history} setLoggedUser={setLoggedUser} />
						</div>

					</Slide>

				</Modal>
		</div>
	);
}

export default Navbar;