// React
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
// Styles
import "./style.css"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Fade, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
// Components
import EditChefModal from "../EditChefModal";
import AddPhoto from "../AddPhoto";
// API
import API from '../../utils/API.js';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	paper: {
		color: '#D4AF37',
		outline: 'none',
		position: 'absolute',
		backgroundColor: '#3b4045',
		boxShadow: theme.shadows[5],
		maxWidth: "80vw",
		minWidth: "40vw",
		padding: theme.spacing(1),
		bottom: "10%",
		top: "10%",
		display: "inline-table"
	},
	upload: {

	},
	pads: {
		marginBottom: "10px"
	},
	disabled: {
		color: "black !important"
	},
	jobTitle: {
		fontWeight: "600"
	},
	modal: {
		display: 'flex', 
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: "90vh",
		overflowY: "scroll"
	},
	colorBtn: {
		background:"rgb(179, 180, 181)",
		color: "black"
	}
}));

function ChefCard(props) {
	const classes = useStyles();

	let [cuisinesState, setCuisinesState] = useState({});
	const [specialtiesState, setSpecialtiesState] = useState({});
	let { id } = useParams();
	let userId = (localStorage.getItem("userData") != null) ? JSON.parse(localStorage.getItem("userData"))._id : null;
	let editBtn;
	let addBtn;

	const generateObject = (typeArr, type) => {
		let obj = {};
		for (let i = 0; i < typeArr.length; i++) {
			const name = typeArr[i].name
			obj[name] = { id: typeArr[i].id, checked: false }
			props.chef[type].forEach(elm => {
				if (elm.name === name) {
					obj[name] = { id: typeArr[i].id, checked: true }
				}
			})
		}
		return obj;
	}

	useEffect(() => {
		API.getAllCuisines()
			.then(res => {
				const cuisines = res.data.map(elm => { return { name: elm.name, id: elm._id } })
				setCuisinesState(generateObject(cuisines, "cuisine"));
			}).catch(err => console.log(err));

		API.getAllSpecialties()
			.then(res => {
				const specialties = res.data.map(elm => { return { name: elm.name, id: elm._id } })
				setSpecialtiesState(generateObject(specialties, "specialty"));
			}).catch(err => console.log(err));
	}, [])
	useEffect(() => {
		const chefsSpecialties = [];
		Object.keys(specialtiesState).forEach(key => {
			if (specialtiesState[key].checked) {
				chefsSpecialties.push(specialtiesState[key].id)
			}
		})
		props.setChef({ ...props.chef, specialty: chefsSpecialties })
	}, [specialtiesState])

	useEffect(() => {

		const chefsCuisines = [];
		Object.keys(cuisinesState).forEach(key => {
			if (cuisinesState[key].checked) {
				chefsCuisines.push({ _id: cuisinesState[key].id, name: key })
			}
		})

		props.setChef({ ...props.chef, cuisine: chefsCuisines })

	}, [cuisinesState])
	if (userId === id) {
		editBtn = <Button onClick={props.handleOpenEdit}>Edit Profile</Button>;
		addBtn = <Button onClick={props.handleOpenAdd}>Add Food</Button>;
	}

	function generateSpecialitiesCheckBoxes(modalFlag) {
		const keys = Object.keys(specialtiesState)
		if (modalFlag) {
			return keys.map((speciality, index) => {
				return (<FormControlLabel
					control={<Checkbox key={index} name={speciality} checked={specialtiesState[speciality].checked} onChange={onSpecialityChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
					label={speciality}
					key={index}
				/>)
			})
		} else {
			return keys.map((speciality, index) => {
				if (specialtiesState[speciality].checked) {
					return (<FormControlLabel
						control={<Checkbox key={index} name={speciality} disabled checked={specialtiesState[speciality].checked} onChange={onSpecialityChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
						label={speciality}
						key={index}
					/>)
				} else {
					return null;
				}
			})
		}
	}
	function generateCuisinesCheckBoxes(modalFlag) {
		const keys = Object.keys(cuisinesState)
		return keys.map((cuisine, index) => {
			if (modalFlag) {
				return (<FormControlLabel
					control={<Checkbox name={cuisine} checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
					label={cuisine}
					key={index}
				/>)
			} else {
				if (cuisinesState[cuisine].checked) {
					return (<FormControlLabel
						control={<Checkbox className={classes.disabled} key={index} name={cuisine} disabled checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
						label={cuisine}
						className={classes.disabled}
						disabled
						key={index}
					/>)
				} else {
					return null;
				}
			}
		})
	}
	function onSpecialityChange(event) {
		const { name, checked } = event.target;

		setSpecialtiesState({ ...specialtiesState, [name]: { checked: checked, id: specialtiesState[name].id } })


	}
	function onCuisinesChange(event) {
		const { name, checked } = event.target;

		setCuisinesState({ ...cuisinesState, [name]: { checked: checked, id: cuisinesState[name].id } })
	}

	let chefRestaurant
	if (props.chef.restaurants) {

		chefRestaurant = JSON.parse(props.chef.restaurants).map((restaurant, index) => (
			<Box key={index}>
				<Typography className={classes.jobTitle} variant="body1" gutterBottom>
					{restaurant.jobTitle}
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					{restaurant.workPlace} - {restaurant.duration} years
				</Typography>
			</Box>
		))
	}
	let contact
	if (props.chef.contactInfo) {
		contact = "mailto:" + props.chef.contactInfo.email + "?subject=Indulge%20Request&body=I'd%20like%20to%20book%20an%20appointment"

	}
	return (
		<div>
			<Fade in={true} timeout={800}>
			<Card className={classes.card}>
				<CardMedia
					className={classes.cardMedia}
					image={props.chef.profilePic}
					title="Image title"
				/>
				<CardContent className={classes.cardContent}>
					<Typography variant="h5" component="h2" gutterBottom>
						{props.chef.first} {props.chef.last}
					</Typography>
					<Box className={classes.pads}>
						<Typography variant="h6" gutterBottom>
							Bio
						</Typography>
						<Typography>
							{props.chef.bio}
						</Typography>
					</Box>
					<Box className={classes.pads}>
						<Typography variant="h6" gutterBottom>
							Cuisine & Specialties
						</Typography>
						<FormGroup row>
							{generateCuisinesCheckBoxes(false)}
							{generateSpecialitiesCheckBoxes(false)}
						</FormGroup>
					</Box>
					<Box className={classes.pads}>
						<Typography variant="h6" gutterBottom>
							Experience
					</Typography>
						<FormGroup>
							{chefRestaurant}
						</FormGroup>
					</Box>
					<Typography variant="h6" gutterBottom>
						Zip Code
					</Typography>
					<Typography>
						{props.chef.zipcode}
					</Typography>
				</CardContent>
				<CardActions>
					<Button className={classes.colorBtn} variant="contained" color="primary" href={contact}>
						Contact Chef
					</Button>
					{editBtn}
					{addBtn}
				</CardActions>
			</Card>
			</Fade>
			
			<Modal
				className={classes.modal}
				open={props.openEdit}
				onClose={props.handleCloseEdit}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Slide direction="down" in={props.openEdit}>	
				<div className={classes.paper}>
					<EditChefModal
						handleInputChange={props.handleInputChange}
						handleFormSubmit={props.handleFormSubmit}
						chef={props.chef}
						file={props.file}
						fileChange={props.fileChange}
						uploadToCloudinary={props.uploadToCloudinary}
						populateSpecialty={generateSpecialitiesCheckBoxes}
						populateCuisine={generateCuisinesCheckBoxes}
					/>
				</div>
				</Slide>
			</Modal>
			<Modal
				className={classes.modal}
				open={props.openAdd}
				onClose={props.handleCloseAdd}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				closeAfterTransition
			>
				<Slide direction="down" in={props.openAdd}>		
				<div className={classes.paper}>
					<AddPhoto
						handleInputChange={props.handleInputChange}
						handleFormSubmit={props.handleFormSubmit}
						chef={props.chef}
						setChef={props.setChef}
						file={props.file}
						fileChange={props.fileChange}
						uploadToCloudinary={props.uploadToCloudinary}
						userId={userId}
					/>
				</div>
				</Slide>
			</Modal>
		</div>
	)
}

export default ChefCard;