// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fade } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button"
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// API
import axios from "axios";
import API from "../../utils/API"

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "20px 0",
		padding: "20px"
	},
	button: {
		margin: "20px 0 20px 0",
		display: "block"
	},
	grid: {
		marginBottom: "20px"
	}
}));

function Signup() {
	let [info, setInfo] = useState({ first: "", last: "", email: "", bio: "", zipcode: "", password: "", username: "" });
	let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
	let [highlightStore, setHighlightStore] = useState([]);
	let [cuisinesState, setCuisinesState] = useState({});
	let [specialitiesState, setSpecialitiesState] = useState([]);
	let [services, setServicesState] = useState({});
	let [profilePicture, setProfilePicture] = useState('');
	let [file, setFile] = useState("");
	let [uploadFlag, setUploadFlag] = useState(false);
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
				control={<Checkbox name={speciality} checked={specialitiesState[speciality].checked} onChange={onSpecialityChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
				label={speciality}
				key={index}
			/>)
		})
	}
	function generateCuisinesCheckBoxes() {
		const keys = Object.keys(cuisinesState)
		return keys.map((cuisine, index) => {
			return (<FormControlLabel
				control={<Checkbox name={cuisine} checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
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
		reader(file).then(result => {
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

		const payload = Object.assign(info, { restaurants: JSON.stringify(highlightStore) }, { cuisine: chefsCuisines, specialty: chefsSpecialities, profilePic: profilePicture, contactInfo: { email: info.email } },)
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
		setInfo({ first: "", last: "", email: "", bio: "", zipcode: "", password: "", username: "" });
		setProfilePicture("")
		setCuisinesState({});
		setSpecialitiesState([]);
		setServicesState({});
	}
	const classes = useStyles();
	return (
		<Fade in={true}>
		<Paper className={classes.root}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Typography variant="h3" gutterBottom>
						Sign Up
						</Typography>
				</Grid>
			</Grid>
			<form noValidate autoComplete="off">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
						<Grid container className={classes.grid}>
							<Grid item xs={12} sm={12}>
								<Typography variant="h5">
									Account
								</Typography>
								<TextField fullWidth label="Username" name="username" value={info.username} onChange={onInfoChange} />
								<TextField fullWidth type="password" label="Password" name="password" value={info.password} onChange={onInfoChange} />
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item xs={12}>
								<Typography gutterBottom variant="h5" >
									Photo
								</Typography>
								<Typography gutterBottom style={!uploadFlag ? {color:"gray"} : {color:"black"}}>{file ? file.name : "No File Selected"}</Typography>
								<Button variant="contained" component="label" startIcon={<CloudUploadIcon />} onChange={(event) => setFile(event.target.files[0])} val={file}>Select Profile Pic<input type="file" hidden /></Button>
								{file ? <Button className={classes.button} variant="contained" color="secondary" onClick={() => {setUploadFlag(true); uploadToCloudinary(file)}}>Save Profile Pic</Button> : <span></span>}
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item xs={12}>
								<Typography variant="h5">
									Profile
								</Typography>
								<TextField fullWidth label="First Name" name="first" value={info.first} onChange={onInfoChange} />
								<TextField fullWidth label="Last Name" name="last" value={info.last} onChange={onInfoChange} />
								<TextField fullWidth label="Email" name="email" value={info.email} onChange={onInfoChange} />
								<TextField fullWidth label="Zip Code" name="zipcode" value={info.zipcode} onChange={onInfoChange} />
								<TextField fullWidth label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
						<Grid container className={classes.grid}>
							<Grid item xs={12}>
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
							<Grid item xs={12}>
								<Typography variant="h5" gutterBottom>
									Dietary Specialties
								</Typography>
								<FormGroup row>
									{generateSpecialitiesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item xs={12}>
								<Typography variant="h5" gutterBottom>
									Cusines
								</Typography>
								<FormGroup row>
									{generateCuisinesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>Create Profile</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
		</Fade>
	);
}

export default Signup;