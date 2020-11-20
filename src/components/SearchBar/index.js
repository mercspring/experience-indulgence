// React
import React, { useEffect, useState } from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button"
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import API from '../../utils/API.js';

const useStyles = makeStyles((theme) => ({
    card:{
        marginTop:"20px",
        marginBottom:"20px",
        padding:"10px"
    },
    flex:{
        width: "100%"
    },
    button:{
        height:"100%"
    }
}));

function isJson(arr) {
    try {
        console.log(arr[0])
        JSON.parse(arr[0]);
    } catch (e) {
        return false;
    }
    return true;
}

function SearchBar( props ) {
    const [searchTerm, setSearchTerm] = useState();
    const [zipCode, setZipCode] = useState();
    const [typeOfSearch, setTypeOfSearch] = useState();
    function onSearchSubmit(event) {
        event.preventDefault();
        API.getChefsByZip(zipCode.trim()).then(result => {
            const { data } = result;
            let searchResults, matches;
            const re = new RegExp(searchTerm, "i");
            
            if(typeOfSearch === "cuisine"){
                searchResults = data.filter(elm => {
                    matches = elm.cuisine.filter( cuisine => {
                        return re.test(cuisine.name)
                    })

                    if (matches.length > 0){
                        return true
                    } else {
                        return false
                    }
                })
            } else if(typeOfSearch === "restaurant"){

                searchResults = data.filter(elm => {
                    const restaurants = isJson(elm.restaurants) ? JSON.parse(elm.restaurants) : []
                    matches = restaurants.filter(elm => {
                        return re.test(elm.workPlace);
                    })

                    if (matches.length > 0){
                        return true
                    } else {
                        return false
                    }
                })

            } else if(typeOfSearch === "chef"){
                
                searchResults = data.filter(elm => { return re.test(elm.first + elm.last)})

            } else{
                searchResults = data;

            }
            console.log(searchResults)
                props.setSearchResults(searchResults);
        }).catch(err=>console.log(err))
    }
    function onZipChange(event) {
        setZipCode(event.target.value);
    }
    function onSearchChange(event) {
        setSearchTerm(event.target.value);
    }
    function onTypeChange(event) {
        setTypeOfSearch(event.target.value);
    }

    const classes = useStyles();
    return (
        <Paper className={classes.card} elevation={1}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <FormControl className={classes.flex}>
                        <InputLabel>Select Option</InputLabel>
                        <Select
                            fullWidth
                            value={typeOfSearch}
                            onChange={onTypeChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <MenuItem value={"cuisine"}>Cuisine</MenuItem>
                            <MenuItem value={"restaurant"}>Restaurant</MenuItem>
                            <MenuItem value={"chef"}>Chef</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl className={classes.flex}>
                        <TextField fullWidth label="Zip Code" name="zipcode" value={zipCode} onChange={onZipChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl className={classes.flex}>
                        <TextField fullWidth label="Search" name="search" value={searchTerm} onChange={onSearchChange} />
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <Button  className={classes.button} fullWidth color="primary" variant="contained" size="large" onClick={onSearchSubmit}> Search </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SearchBar;