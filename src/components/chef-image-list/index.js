import React from 'react';
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

const tileData = [
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 2,
    rows: 2,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols:  1,
    rows: 2
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: 'https://source.unsplash.com/random',
    title: 'Image',
    author: 'author',
    cols: 1,
  }
];

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={3}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1} rows={tile.rows || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}