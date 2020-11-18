import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 0 0 20px',
    overflow: 'hidden',
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={3}>
        {/*chef.map((chef) => (
          <GridListTile key={chef._id} cols={chef.cols || 1} rows={chef.rows || 1}>
            <img src={chef.img} alt={chef.title} />
          </GridListTile>
        ))*/}
      </GridList>
    </div>
  );
}