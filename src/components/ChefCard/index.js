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
import Modal from '@material-ui/core/Modal';
import EditChefModal from "../EditChefModal";

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
		top: "40%",
		left: "50%",
		transform: "translate(-50%, -40%)",
	},
}));

function ChefCard(props) {
	const classes = useStyles();
	const {id} = useParams();
	console.log(id)
	let editBtn
	if(localStorage.getItem("id")===id){
		console.log("HELLO THERE")
		editBtn = <Button size="large" onClick={props.handleOpenEdit}>Edit</Button>;
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
				<Typography gutterBottom variant="h5" component="h2">
					{props.chef.first} {props.chef.last}
				</Typography>
				<Typography>
					{props.chef.bio}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="large" color="primary">
					Contact
				</Button>
				{editBtn}
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
		</div>
	)
}

export default ChefCard;