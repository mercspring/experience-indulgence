// React
import React from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		borderRadius: '4px',
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	}
}));

function ChefFood(props) {
	let chefFoods
	if(props.chef.photos){
		chefFoods = props.chef.photos.map((photo) => (<GridListTile key={photo._id} cols={1} rows={1}><img src={photo.url} alt={photo.title}/></GridListTile>))
	}
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Fade in={true} timeout={800}>
			<Paper elevation={1}>
				{chefFoods ?
					<GridList cellHeight={160} cols={3}>
						{chefFoods}
					</GridList>
					:
					null
				}
			</Paper>
			</Fade>
		</div>
	);
}

export default ChefFood;