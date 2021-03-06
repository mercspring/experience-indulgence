// React
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Styles
import { ThemeProvider, createMuiTheme, makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
// Components
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import ClientSignup from "./pages/ClientSignup";
import ProfileChef from "./pages/ProfileChef";
import ProfileClient from "./pages/ProfileClient";

import Footer from "./components/Footer";

import './App.css';

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
			main: '#eeeeee',
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
    paddingTop: "90px",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div style={{background: "#b3b4b5", minHeight: "900px"}}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
				<Router>
					<NavBar />
					<Switch>
						<Route exact path="/" component={Home} />
						<React.Fragment>
						<Container className={classes.root} maxWidth="lg">
							<Route exact path="/search" component={Search} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/client-signup" component={ClientSignup} />
							<Route exact path="/profile/:id" component={ProfileChef} />
							<Route exact path="/client-profile/:id" component={ProfileClient} />
						</Container>
						</React.Fragment>
					</Switch>
				</Router>
			<Footer />
		</ThemeProvider>
		</div>
	);
} 

export default App;
