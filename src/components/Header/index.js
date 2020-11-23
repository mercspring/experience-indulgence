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
		height: '580px',
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
		<Box className={classes.hero}>
			<Container maxWidth="lg">
				<div className={classes.overlay} />
				<Grid container className={classes.heroInner}>
					<Grid item xs={12}>
						<Typography className={classes.font} component="h1" variant="h2" color="" gutterBottom>
						Experience Elegance at Home
						</Typography>
						<Typography component="h2" variant="h5" color="inherit" gutterBottom>
						Find your perfect date night
						</Typography>
<<<<<<< HEAD
						<Box className={classes.box}>
							<Button href="/signup" size="large" variant="contained" color="primary">Signup</Button>
						</Box>
=======
						<Button className={classes.btn} href="/signup" size="large">Signup</Button>
>>>>>>> dev
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Header;
