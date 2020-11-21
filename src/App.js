// React
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Styles
import { ThemeProvider, createMuiTheme, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// Components

import NavBar from "./components/navbar";
import Home from "./pages/Home";
import Search from "./pages/search";
import Signup from "./pages/Signup";
import ProfileChef from "./pages/ProfileChef";
import Footer from "./components/Footer";


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// Base Theme Customization
theme = createMuiTheme({
	palette: {
		primary: {
			light: '#ae895d',
			main: '#292C30',
			dark: '#3b4045',
			contrastText: '#ae895d',
		},
		secondary: {
			light: '#b3b4b5',
			main: '#24292d',
			dark: '#5d646b',
			contrastText: '#ae895d',
		},
	},
	typography: {
		fontFamily: [
		  '-apple-system',
		  'BlinkMacSystemFont',
		  '"Segoe UI"',
		  'Roboto',
		  '"Helvetica Neue"',
		  'Arial',
		  'sans-serif',
		  '"Apple Color Emoji"',
		  '"Segoe UI Emoji"',
		  '"Segoe UI Symbol"',
		].join(','),
	},
	spacing: 20,
});

const useStyles = makeStyles((theme) => ({
	root: {
    marginTop: "120px",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div style={{background: "#b3b4b5"}}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
				<Router>
					<NavBar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Container className={classes.root} maxWidth="lg">
							<Route exact path="/search" component={Search} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/signin" component={Signup} />
							<Route exact path="/profile/:id" component={ProfileChef} />
						</Container>
					</Switch>
				</Router>
			<Footer />
		</ThemeProvider>
		</div>
	);
} 

export default App;
