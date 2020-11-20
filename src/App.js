// React
import React, { useEffect, useState } from "react";
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
import ProfileChef from "./pages/ProfileChef";
import Footer from "./components/Footer";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// API
import axios from "axios";
import API from "../../utils/API"

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
			main: '#ffa500',
			dark: '#ba000d',
			contrastText: '#000',
		}
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
		marginTop: "100px",
	},
}));

function App() {
	const [loggedUser, setLoggedUser] = useState(false);
	useEffect(() => {
		if (localStorage.getItem("userData")) {
			setLoggedUser(true);
		}
	}, [])

	// MOVED CODE FROM SIGNUP PAGE
	let [info, setInfo] = useState({ first: "", last: "", email: "", bio: "", zip: "", password: "", username: "" });
	let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
	let [highlightStore, setHighlightStore] = useState([]);
	let [profilePicture, setProfilePicture] = useState('');
	let [file, setFile] = useState("");
	const generateObject = (typeArr) => {
		let obj = {};
		for (let i = 0; i < typeArr.length; i++) {
			const name = typeArr[i].name
			obj[name] = { id: typeArr[i].id, checked: false }
		}
		return obj;
	}

	function generateSpecialitiesCheckBoxes() {
		const keys = Object.keys(specialitiesState)
		return keys.map((speciality, index) => {
			return (<FormControlLabel
				control={<Checkbox name={speciality} checked={specialitiesState[speciality].checked} onChange={onSpecialityChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>}
				label={speciality}
				key={index}
			/>)
		})
	}
	function generateCuisinesCheckBoxes() {
		const keys = Object.keys(cuisinesState)
		return keys.map((cuisine, index) => {
		return (<FormControlLabel
			control={<Checkbox name={cuisine} checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>}
			label={cuisine}
			key={index}
		/>)
		})
	}

	function onInfoChange(event) {
		const { name, value } = event.target;
		setInfo({ ...info, [name]: value });
	}
	function onHightlightsChange(event) {
		const { name, value } = event.target;
		setHighlights({ ...highlights, [name]: value });
	}
	function onAddHighlight(event) {
		event.preventDefault();
		if (highlights.workPlace) {
			setHighlightStore([...highlightStore, highlights]);
			setHighlights({ workPlace: "", jobTitle: "", duration: "" });
		} else {
			return
		}
	}

	function uploadToCloudinary() {
		console.log(file);
		reader(file).then( result => {
		axios.post("https://api.cloudinary.com/v1_1/mercspring/upload", { upload_preset: 'ml_default', file: result })
			.then(result => {
			console.log(result.data)
			setProfilePicture(result.data.secure_url);
			})
			.catch(err => {
			console.log(err);
			})
		})
	}
	const reader = (file) => {
		return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = () => resolve(fileReader.result);
		fileReader.readAsDataURL(file);
		});
	}

	let [cuisinesState, setCuisinesState] = useState({});
	let [specialitiesState, setSpecialitiesState] = useState({});
	let [services, setServicesState] = useState([]);

	useEffect(() => {
		API.getAllCuisines()
		.then(res => {
			const cuisines = res.data.map(elm => { return { name: elm.name, id: elm._id } })
			console.log(cuisines)
			setCuisinesState(generateObject(cuisines));
		}).catch(err => console.log(err));

		API.getAllSpecialties()
		.then(res => {
			const specialities = res.data.map(elm => { return { name: elm.name, id: elm._id } })
			console.log(specialities)
			setSpecialitiesState(generateObject(specialities));
		}).catch(err => console.log(err));

		API.getAllServices()
		.then(res => setServicesState(res.data)
		).catch(err => console.log(err));
	}, [])

	function onSpecialityChange(event) {
		const { name, checked } = event.target;
		setSpecialitiesState({ ...specialitiesState, [name]: { checked: checked, id: specialitiesState[name].id } });
	}
	function onCuisinesChange(event) {
		const { name, checked } = event.target;
		setCuisinesState({ ...cuisinesState, [name]: { checked: checked, id: cuisinesState[name].id } });
	}

	function onSubmit(event) {
		event.preventDefault();
		console.log(Object.keys(cuisinesState));
		let chefsCuisines = [];
		let chefsSpecialities = [];

		Object.keys(cuisinesState).forEach(key => {
			if (cuisinesState[key].checked) {
				chefsCuisines.push(cuisinesState[key].id)
			}
		})

		Object.keys(specialitiesState).forEach(key => {
			if (specialitiesState[key].checked) {
				chefsSpecialities.push(specialitiesState[key].id)
			}
		})

		const payload = Object.assign(info, { restaurants: JSON.stringify(highlightStore) }, { cuisine: chefsCuisines, specialty: chefsSpecialities,})
		console.log(payload)
		API.createProfile(payload)
		.then(result => {
			console.log(result);
		}).catch(err => {
			console.log(err);
		});

		// Empty Forms
		setCuisinesState({});
		setSpecialitiesState({});
		setServicesState([]);
	}

	//
	const classes = useStyles();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
				<Router>
					<NavBar loggedIn={loggedUser}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Container className={classes.root} maxWidth="lg">
							<Route exact path="/search" component={Search} />
							<Route exact path="/signup" component={Signup} />
							<Route
							onSubmit={onSubmit}
							onCuisinesChange={onCuisinesChange}
							onSpecialityChange={onSpecialityChange}
							generateSpecialitiesCheckBoxes={generateSpecialitiesCheckBoxes}
							generateCuisinesCheckBoxes={generateCuisinesCheckBoxes}
							onInfoChange={onInfoChange}
							onHightlightsChange={onHightlightsChange}
							onAddHighlight={onAddHighlight}
							uploadToCloudinary={uploadToCloudinary}
							exact path="/profile/:id" component={ProfileChef} />
						</Container>
					</Switch>
				</Router>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
