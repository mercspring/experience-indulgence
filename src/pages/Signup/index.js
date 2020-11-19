// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
// API
import axios from "axios";
import API from "../../utils/API"

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "20px 0",
		padding: "20px"
	},
	button:{
		margin: "20px 0 20px 0",
		display: "block"
	},
	grid:{
		marginBottom: "20px"
	}
}));

function Signup() {
	let [info, setInfo] = useState({ first: "", last: "", email: "", bio: "", zip: "", password: "", username: "" });
	let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
	let [highlightStore, setHighlightStore] = useState([]);
	let [cuisinesState, setCuisinesState] = useState({});
	let [specialitiesState, setSpecialitiesState] = useState({});
	let [profilePicture, setProfilePicture] = useState('');
	let [services, setServicesState] = useState([]);
	let [file, setFile] = useState("");
	const generateObject = (typeArr) => {
		let obj = {};
		for (let i = 0; i < typeArr.length; i++) {
			const name = typeArr[i].name
			obj[name] = { id: typeArr[i].id, checked: false }
		}
		return obj;
	}

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
	function generateSpecialitiesCheckBoxes() {
		const keys = Object.keys(specialitiesState)
		return keys.map((speciality, index) => {
			return (<FormControlLabel
				control={<Checkbox name={speciality} checked={specialitiesState[speciality].checked} onChange={onSpecialityChange} />}
				label={speciality}
				key={index}
			/>)
		})
	}
	function generateCuisinesCheckBoxes() {
		const keys = Object.keys(cuisinesState)
		return keys.map((cuisine, index) => {
		return (<FormControlLabel
			control={<Checkbox name={cuisine} checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} />}
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
	function onSpecialityChange(event) {
		const { name, checked } = event.target;
		setSpecialitiesState({ ...specialitiesState, [name]: { checked: checked, id: specialitiesState[name].id } });
	}
	function onCuisinesChange(event) {
		const { name, checked } = event.target;
		setCuisinesState({ ...cuisinesState, [name]: { checked: checked, id: cuisinesState[name].id } });
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

		const payload = Object.assign(info, { restaurants: JSON.stringify(highlightStore) }, { cuisine: chefsCuisines, specialty: chefsSpecialities, profilePic: profilePicture })
		console.log(payload)
		API.createProfile(payload)
		.then(result => {
			console.log(result);
		}).catch(err => {
			console.log(err);
		});

		// Empty Forms
		setHighlights({ workPlace: "", jobTitle: "", duration: "" });
		setHighlightStore([]);
		setInfo({ first: "", last: "", email: "", bio: "", zip: "", password: "", username: "" });
		setProfilePicture("")
		setCuisinesState({});
		setSpecialitiesState({});
		setServicesState([]);
	}

	const classes = useStyles();
	return (
		<Paper className={classes.root}>
				<Grid container spacing={2}>
					<Grid item lg={12}>
						<Typography variant="h3" gutterBottom>
							Sign Up
						</Typography>
					</Grid>
				</Grid>
			<form noValidate autoComplete="off">
				<Grid container spacing={2}>
					<Grid item lg={6}>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5">
									Account
								</Typography>
								<TextField fullWidth label="Username" name="username" value={info.username} onChange={onInfoChange} />
								<TextField fullWidth label="Password" name="password" value={info.password} onChange={onInfoChange} />
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5" gutterBottom>
									Photo
								</Typography>
								<Button variant="contained" component="label" startIcon={<CloudUploadIcon />} onChange={(event) => setFile(event.target.files[0])} val={file}>Upload <input type="file" hidden /></Button>
								<Button className={classes.button} variant="contained" color="secondary" onClick={() => uploadToCloudinary(file)}>Save Profile Pic</Button>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5">
									Profile
								</Typography>
								<TextField fullWidth label="First Name" name="first" value={info.first} onChange={onInfoChange} />
								<TextField fullWidth label="Last Name" name="last" value={info.last} onChange={onInfoChange} />
								<TextField fullWidth label="Email" name="email" value={info.email} onChange={onInfoChange} />
								<TextField fullWidth label="Zip Code" name="zip" value={info.zip} onChange={onInfoChange} />
								<TextField fullWidth label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} />
							</Grid>
						</Grid>
						<Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>Create Profile</Button>
					</Grid>
					<Grid item lg={6}>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5">
									Experience
								</Typography>
								{highlightStore.map((elm, index) => {
									return (<div key={index}>
									<p> <strong>Place of Work: </strong> {elm.workPlace}</p>
									<p> <strong>Job Title: </strong>{elm.jobTitle}</p>
									<p> <strong>Duration: </strong>{elm.duration}</p>
									</div>)
								})}
								<TextField fullWidth label="Job title" name="jobTitle" onChange={onHightlightsChange} value={highlights.jobTitle} />
								<TextField fullWidth label="Place of Work" name="workPlace" onChange={onHightlightsChange} value={highlights.workPlace} />
								<TextField fullWidth label="Duration" name="duration" onChange={onHightlightsChange} value={highlights.duration} />
								<Button className={classes.button} variant="contained" color="secondary" onClick={onAddHighlight}>Add Experience</Button>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5" gutterBottom>
									Dietary Specialties
								</Typography>
								<FormGroup row>
									{generateSpecialitiesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5" gutterBottom>
									Cusines
								</Typography>
								<FormGroup row>
									{generateCuisinesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

export default Signup;