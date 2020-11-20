// React
import React from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import SigninModal from "../SigninModal";
import Modal from '@material-ui/core/Modal';
import "../Navbar/style.css"

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

function Navbar() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
	  setOpen(true);
	};
	const handleClose = () => {
	  setOpen(false);
	};

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
							<Button href="/signup" color="inherit">Signup</Button>
							<Button onClick={handleOpen} color="inherit">Login</Button>
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
					<SigninModal />
				</div>
			</Modal>
		</div>
	);
}

export default Navbar;