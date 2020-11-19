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
import SearchBar from '../../components/SearchBar'

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    return (
        <div>
            <SearchBar setSearchResults={setSearchResults} />
            <Grid container spacing={1}>
                {
                    searchResults.map(elm => {
                        return (<SearchCard 
                            first={elm.first} 
                            last={elm.last}
                            sigDishImage={elm.photos[0].url || "http://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"}
                            profilePic={elm.profilePic || "https://www.svgrepo.com/show/41193/chef-hat.svg"} 
                            key={elm._id}
                            />)
                    })
                }
                {/* <Grid item xs={4}>
                    <SearchCard />
                </Grid>
                <Grid item xs={4}>
                    <SearchCard />
                </Grid>
                <Grid item xs={4}>
                    <SearchCard /> */}
                {/* </Grid> */}
            </Grid>
        </div>
    )
}

export default Search;