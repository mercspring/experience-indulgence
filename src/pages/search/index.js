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
// Components
import SearchCard from '../../components/SearchCard'

const useStyles = makeStyles((theme) => ({
    card:{
        margin:"20px 0 20px 0",
        padding:"10px"
    },
    flex:{
        width: "100%"
    },
    button:{
        height:"100%"
    }
}));

function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [zipCode, setZipCode] = useState();
    const [typeOfSearch, setTypeOfSearch] = useState();
    function onSearchSubmit(event) {
        setSearchTerm("")
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
        <div>
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
                                <MenuItem value={10}>Cusine</MenuItem>
                                <MenuItem value={20}>Restaurant</MenuItem>
                                <MenuItem value={30}>Chef</MenuItem>
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
                        <Button  className={classes.button} fullWidth color="primary" variant="contained" size="large" onSubmit={onSearchSubmit}> Search </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <SearchCard />
                </Grid>
                <Grid item xs={4}>
                    <SearchCard />
                </Grid>
                <Grid item xs={4}>
                    <SearchCard />
                </Grid>
            </Grid>
        </div>
    )
}

export default Search;