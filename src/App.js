// React
import React, { useEffect, useState } from "react";
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
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#FFFFFF',
			dark: '#ba000d',
			contrastText: '#000',
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
	const [loggedUser, setLoggedUser] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("userData")) {
			setLoggedUser(true);
		}
	}, [])
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<NavBar loggedIn={loggedUser}/>
				<Router>
					<Switch>
						<Route exact path="/" component={Home} />
						<Container className={classes.root} maxWidth="lg">
							<Route exact path="/search" component={Search} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/signin" component={Signup} />
							<Route exact path="/profile/:chef" component={ProfileChef} />
						</Container>
					</Switch>
				</Router>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
