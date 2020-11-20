// React
import React from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: '0 0 0 20px',
		borderRadius: '4px',
		backgroundColor: theme.palette.background.paper,
	}
}));

function ChefFood(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper elevation={1}>
				<GridList cellHeight={160} cols={3}>
					{
					props.chef.photos != undefined ? (
						props.chef.photos.map((photo) => (
							<GridListTile cols={1} rows={1}>
								<img src={photo.url} />
							</GridListTile>
						))
					):null
				}
				</GridList>
			</Paper>
		</div>
	);
}

export default ChefFood;