// React
import React from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	mainFeaturedPost: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		height: '540px'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},
	mainFeaturedPostContent: {
		position: 'relative',
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			paddingTop: theme.spacing(10),
			paddingLeft: theme.spacing(6),
		},
	},
	box:{
		marginTop: "20px"
	}
}));

function Header() {
	const classes = useStyles();
	return (
		<Box
		className={classes.mainFeaturedPost}
		>
			<div className={classes.overlay} />
			<Grid container>
				<Grid item md={12}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography component="h1" variant="h2" color="inherit" gutterBottom>
						Experience Elegance at Home
						</Typography>
						<Typography component="h2" variant="h5" color="inherit" gutterBottom>
						Find your perfect date night
						</Typography>
						<Box className={classes.box}>
							<Button href="/signup" size="large" variant="contained" color="primary">Signup</Button>
						</Box>
					</div>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Header;
