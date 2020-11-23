// React
import React, { useEffect, useState } from 'react';
// Styles
import Grid from "@material-ui/core/Grid"
import Typography from '@material-ui/core/Typography';
// Components
import SearchCard from '../../components/SearchCard'
import SearchBar from '../../components/SearchBar'

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searched, setSearched] = useState()
    
    return (
        <div>
            <SearchBar setSearched = {setSearched} setSearchResults={setSearchResults} />
                            
            <Grid container spacing={1}>
                { (searchResults.length > 0) ?
                    searchResults.map(elm => {
                        return (<SearchCard 
                            first={elm.first} 
                            last={elm.last}
                            sigDishImage={elm.photos[0] ? elm.photos[0].url : "http://www.dirtyapronrecipes.com/wp-content/uploads/2015/10/food-placeholder.png"}
                            profilePic={elm.profilePic || "https://www.svgrepo.com/show/41193/chef-hat.svg"} 
                            key={elm._id}
                            id={elm._id}
                            />)
                    }) : searched ? <Grid item xs={12}><Typography variant="h5">No Results</Typography></Grid> : <Grid item xs={12}><Typography variant="h5">Search for a chef by chef name, restaurant or cusine</Typography></Grid>}
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