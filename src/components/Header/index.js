// React
import React from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import hero from  "../../assets/herothree.jpg"
import { Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	hero: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.primary.contrastText,
		marginBottom: theme.spacing(4),
		backgroundImage: `url(${hero})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: '540px',
		zIndex: "1"
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.6)',
		zIndex: "-1"
	},
	heroInner:{
		paddingTop: "160px"
	},
	btn:{
		marginTop: "20px",
		background: "rgb(179, 180, 181)",
		"&:hover":{
			background: "white",
		}
	},
	font:{
		fontFamily: "'Italianno', cursive",
		fontSize: "6em",
		lineHeight: "1em"
	}
}));

function Header() {
	const classes = useStyles();
	return (
		<Fade in={true} timeout={700}>
		<Box className={classes.hero}>
			<Container maxWidth="lg">
				<div className={classes.overlay} />
				<Grid container className={classes.heroInner}>
					<Grid item xs={12}>
						<Typography className={classes.font} component="h1" variant="h2" gutterBottom>
						Experience Elegance at Home
						</Typography>
						<Typography component="h2" variant="h5" color="inherit" gutterBottom>
						Find your perfect date night
						</Typography>
						<Button className={classes.btn} href="/search" size="large">Search</Button>
					</Grid>
				</Grid>
			</Container>
		</Box>
		</Fade>
	);
}

export default Header;
