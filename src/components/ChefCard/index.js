// React
import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
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
// API
import API from  "../../utils/API"

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
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => {
		setOpenEdit(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const [chefState,setChefState] = useState({
		first:"water",
		last: "water"
	})

    const {id} = useParams();
    useEffect(()=>{
        API.getChef(id).then(chefData=>{
            setChefState({
                first:chefData.first,
                last:chefData.last,
            })
        })
    },[])

    const handleInputChange = event=>{
        const {name,value}=event.target;
        setChefState({
            ...chefState,
            [name]:value
        })
    }

    const handleFormSubmit = event=>{
        event.preventDefault();
		console.log('Updating.....')
		setOpenEdit(false);
    }

	const classes = useStyles();
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
				<Button size="large" onClick={handleOpenEdit}>
					Edit
				</Button>
			</CardActions>
		</Card>
		<Modal
			open={openEdit}
			onClose={handleCloseEdit}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div className={classes.paper}>
				<EditChefModal handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} chef={chefState}/>
			</div>
		</Modal>
		</div>
	)
}

export default ChefCard;