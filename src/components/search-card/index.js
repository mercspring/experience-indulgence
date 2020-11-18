import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./index.css"

export default function SearchCard() {
    return (
        <Grid item m={3}>
            <Card style={{ maxWidth: "300px" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="chef signiture dish"
                        style={{ width: "300px" }}
                        image="https://static.twentytwowords.com/wp-content/uploads/BadFoodHallOfFame_AD.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={5}>
                                <CardMedia
                                    component="img"
                                    alt="Chef profile pic"
                                    style={{ width: "100px", display: 'inline-block' }}
                                    image="https://www.cookingschool.org/img/head-chef.jpeg"
                                    title="Contemplative Reptile"
                                />
                            </Grid>
                            <Grid style={{ display: "flex" }} item xs={7} alignItems='center' justify="center">
                                <div className="search-card-name">
                                    <span className="search-card-first-name">Maxwell</span>
                                    <br />
                                    <span className="search-card-last-name">Jones</span>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
