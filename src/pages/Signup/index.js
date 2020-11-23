// React
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
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
	grid: {
		marginBottom: "20px"
	}
}));

function Signup() {
	let [disableSubmit, setDisableSubmit] = useState(true);
	let [info, setInfo] = useState({ first: "", last: "", email: "", bio: "", zipcode: "", password: "", username: "" });
	let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
	let [highlightStore, setHighlightStore] = useState([]);
	let [cuisinesState, setCuisinesState] = useState({});
	let [specialitiesState, setSpecialitiesState] = useState([]);
	// let [services, setServicesState] = useState({});
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
				control={<Checkbox color="primary" name={speciality} checked={specialitiesState[speciality].checked} onChange={onSpecialityChange} inputProps={{ 'aria-label': 'secondary checkbox' }} />}
				label={speciality}
				key={index}
			/>)
		})
	}
	function generateCuisinesCheckBoxes() {
		const keys = Object.keys(cuisinesState)
		return keys.map((cuisine, index) => {
			return (<FormControlLabel
				control={<Checkbox color="primary" name={cuisine} checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} inputProps={{ 'aria-label': 'secondary checkbox' }} />}
				label={cuisine}
				key={index}
			/>)
		})
	}

	function onInfoChange(event) {
		const { name, value } = event.target;
		setInfo({ ...info, [name]: value });
		if (info.first && info.last && info.email && info.bio && (highlightStore.length > 0)) {
			setDisableSubmit(false);
		} else {
			setDisableSubmit(true);
		}
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

	useEffect(()=>{
		if (info.first && info.last && info.email && info.bio && info.username && info.password && (highlightStore.length > 0)) {
			setDisableSubmit(false);
		} else {
			setDisableSubmit(true);
		}
	},[info,highlightStore])

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

		// API.getAllServices()
		// 	.then(res => setServicesState(res.data)
		// 	).catch(err => console.log(err));
	}, [])

	function onSpecialityChange(event) {
		const { name, checked } = event.target;
		setSpecialitiesState({ ...specialitiesState, [name]: { checked: checked, id: specialitiesState[name].id } });
	}
	function onCuisinesChange(event) {
		const { name, checked } = event.target;
		setCuisinesState({ ...cuisinesState, [name]: { checked: checked, id: cuisinesState[name].id } });
	}

	let history = useHistory();
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
				let userId = result.data._id
				history.push(`/profile/${userId}`);
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
		// setServicesState({});
	}
	const classes = useStyles();
	return (
		<Fade in={true}>
		<Paper className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Typography variant="h3" gutterBottom>
						Sign Up
					</Typography>
				</Grid>
			</Grid>
			<form noValidate autoComplete="off">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
						<Typography variant="h5" gutterBottom>
							Account
						</Typography>
						<Grid container spacing={1} className={classes.grid}>
							<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
								<TextField fullWidth label="Username" name="username" value={info.username} onChange={onInfoChange} />
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
								<TextField fullWidth type="password" label="Password" name="password" value={info.password} onChange={onInfoChange} />
							</Grid>
						</Grid>
						<Typography gutterBottom variant="h5" >
							Photo
						</Typography>
						<Grid container spacing={1} className={classes.grid}>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<Typography style={!uploadFlag ? {color:"gray"} : {color:"black"}} gutterBottom>{file ? file.name : "No File Selected"}</Typography>
								<Button variant="contained" component="label" startIcon={<CloudUploadIcon />} onChange={(event) => setFile(event.target.files[0])} val={file}>Select Profile Pic<input type="file" hidden /></Button>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								{file ? <Button variant="contained" color="secondary" onClick={() => {setUploadFlag(true); uploadToCloudinary(file)}}>Save Profile Pic</Button> : <span></span>}
							</Grid>
						</Grid>
						<Typography variant="h5" gutterBottom>
							Profile
						</Typography>
						<Grid container spacing={1} className={classes.grid}>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<TextField fullWidth label="First Name" name="first" value={info.first} onChange={onInfoChange} />
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
								<TextField fullWidth label="Last Name" name="last" value={info.last} onChange={onInfoChange} />
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<TextField fullWidth label="Email" name="email" value={info.email} onChange={onInfoChange} />
							</Grid>
							<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
								<TextField fullWidth label="Zip Code" name="zipcode" value={info.zipcode} onChange={onInfoChange} />
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<TextField fullWidth label="Bio" name="bio" multiline rows={2} value={info.bio} onChange={onInfoChange} />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
						<Typography variant="h5" gutterBottom>
							Experience
						</Typography>
						<Grid container spacing={1} className={classes.grid}>
								{highlightStore.map((elm, index) => {
									return (
										<Grid item key={index} xs={12} sm={12} md={12} lg={12} xl={12}>
											<Typography variant="body1"><strong>Job Title: </strong>{elm.jobTitle}</Typography>
											<Typography variant="body1"><strong>Place of Work: </strong> {elm.workPlace}</Typography>
											<Typography variant="body1"><strong>Duration: </strong>{elm.duration}</Typography>
										</Grid>
									)
								})}
							<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
								<TextField fullWidth label="Job title" name="jobTitle" onChange={onHightlightsChange} value={highlights.jobTitle} />
							</Grid>
							<Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
								<TextField fullWidth label="Place of Work" name="workPlace" onChange={onHightlightsChange} value={highlights.workPlace} />
							</Grid>
							<Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
								<TextField fullWidth label="Duration" name="duration" onChange={onHightlightsChange} value={highlights.duration} />
							</Grid>
							<Grid item xs={12}>
								<Button variant="contained" color="primary" onClick={onAddHighlight}>Add Experience</Button>
							</Grid>
						</Grid>
						<Typography variant="h5" gutterBottom>
								Cuisines & Specialties
						</Typography>
						<Grid container className={classes.grid}>
							<Grid item xs={12}>
								<FormGroup row>
									{generateSpecialitiesCheckBoxes()}
									{generateCuisinesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Button disabled={disableSubmit} fullWidth variant="contained" color="primary" onClick={onSubmit}>Create Profile</Button>
					</Grid>
					{/* let [info, setInfo] = useState({ first: "", last: "", email: "", bio: "", zipcode: "", password: "", username: "" });
	let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" }); */}
				</Grid>
			</form>
		</Paper>
		</Fade>
	);
}

export default Signup;