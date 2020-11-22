// React
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
// Styles
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
// Components
import EditChefModal from "../EditChefModal";
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
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
		width: "480px",
		display: "inline-table",
		top: "40%",
		bottom: "60%",
		left: "50%",
		right: "50%",
		transform: "translate(-50%, -40%)",
	},
	pads:{
		marginBottom: "10px"
	}
}));

function ChefCard(props) {
	const classes = useStyles();
	let {id} = useParams();
	let userId = JSON.parse(localStorage.getItem("userData"))._id
	let editBtn
	let addBtn
	if(userId===id){
		editBtn = <Button onClick={props.handleOpenEdit}>Edit Profile</Button>;
		addBtn = <Button onClick={props.handleOpenAdd}>Add Food</Button>;
	}
	let chefCuisine
	if(props.chef.cuisine){
		chefCuisine = props.chef.cuisine.map((cuisine) => (<FormControlLabel control={<Checkbox checked={true} onChange={props.handleInputChange} name="checkedA" />} label={cuisine.name} />))
	}
	let chefSpecialty
	console.log(props.chef.specialty)
	if(props.chef.specialty){
		console.log(props.chef.specialty)
		props.chef.specialty.map((hasSpecialty) => {
			API.getAllSpecialties()
			.then(res => {
				chefSpecialty = res.data.map((specialty) => {
						if(specialty.name === hasSpecialty.name){
							<FormControlLabel control={<Checkbox checked={true} onChange={props.handleInputChange} name="checkedA" />} label={specialty.name} />
						} else {
							<FormControlLabel control={<Checkbox checked={false} onChange={props.handleInputChange} name="checkedA" />} label={specialty.name} />
						}
				})
			}).catch(err => console.log(err));
		})

	}
	let chefRestaurant
	if(props.chef.restaurants){
		chefRestaurant = props.chef.restaurants.map((restaurant) => (
			<Typography gutterBottom>
				{props.chef.restaurants}
			</Typography>
		))
	}
	let contact
	if(!props.chef.contactInfo){
		contact = "mailto:" + props.chef.contactInfo.email
	}
	return (
		<div>
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
					{chefCuisine}
					{chefSpecialty}
					</FormGroup>
				</Box>
				<Box className={classes.pads}>
					<Typography variant="h6" gutterBottom>
						Restaurant Experience
					</Typography>
					<FormGroup row>
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
				<Button href={contact}>
					Book Chef
				</Button>
				{editBtn}
				{addBtn}
			</CardActions>
		</Card>
		<Modal
		open={props.openEdit}
		onClose={props.handleCloseEdit}
		aria-labelledby="simple-modal-title"
		aria-describedby="simple-modal-description"
		>
			<div className={classes.paper}>
				<EditChefModal 
				handleInputChange={props.handleInputChange} 
				handleFormSubmit={props.handleFormSubmit} 
				chef={props.chef}
				file={props.file}
				fileChange={props.fileChange}
				uploadToCloudinary={props.uploadToCloudinary}
				/>
			</div>
		</Modal>
		<Modal
		open={props.openAdd}
		onClose={props.handleCloseAdd}
		aria-labelledby="simple-modal-title"
		aria-describedby="simple-modal-description"
		>
			<div className={classes.paper}>
				<h1>Add Photo</h1>
			</div>
		</Modal>
		</div>
	)
}

export default ChefCard;