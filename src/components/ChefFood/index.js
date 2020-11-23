// React
import React from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
<<<<<<< HEAD
import { Fade } from "@material-ui/core";

=======
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import API from '../../utils/API';
>>>>>>> dev
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		borderRadius: '4px',
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	gridList: {
	  width: "100%",
	},
	titleBar:{
		background: 'none' 
	},
	icon:{
		color:"white"
	}
}));

function ChefFood(props) {
<<<<<<< HEAD
	let chefFoods
	if(props.chef.photos){
		chefFoods = props.chef.photos.map((photo) => (<GridListTile key={photo._id} cols={1} rows={1}><img src={photo.url} alt={photo.title}/></GridListTile>))
=======
	let userId = (localStorage.getItem("userData") != null) ? JSON.parse(localStorage.getItem("userData"))._id : null;

	function deleteButton(id){
		API.deletePhoto(id,JSON.parse(localStorage.getItem("userData")).token).then( result =>{
			console.log(result);
			props.setChef({...props.chef, photos:[...props.chef.photos.filter(elm => elm._id != id)]})
		}).catch(err => {
			console.log(err);
			props.setChef({...props.chef, photos:props.chef.photos.filter(elm => elm._id != id)})
		})

>>>>>>> dev
	}
	const classes = useStyles();
	return (
		<Fade in={true} timeout={800}>
		<Paper className={classes.root} elevation={1}>
			<GridList className={classes.gridList} cellHeight={160} cols={3}>
				{props.chef.photos ? props.chef.photos.map((photo,index) => (<GridListTile key={index} cols={1} rows={1}><img src={photo.url} alt={photo.title}/>
		{(userId === props.chef._id) ? <GridListTileBar
              titlePosition="top"
              actionIcon={
				
                <IconButton aria-label={`delete`} onClick={() => {deleteButton(photo._id)}}>
					<DeleteOutlineIcon className={classes.icon}/>
                </IconButton>
			  } 
               actionPosition="right"
               className={classes.titleBar}
            /> : <span></span>}
			</GridListTile>)) : <h2>No Photos</h2>}
			</GridList>
		</Paper>
		</Fade>
	);
}

export default ChefFood;