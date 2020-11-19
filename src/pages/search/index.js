import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import SearchCard from '../../components/search-card'
import Navbar from '../../components/navbar';
import "./index.css"

export default function Search() {

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

    return (
        <div>
            <Navbar />
            {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
                <Grid container spacing={1} style={{width:"100%"}} justify="center">
                    <Grid item md={3} style={{position:"relative"}}>
                    {/* <InputLabel id="search-type-label" >Search Type</InputLabel> */}
                        <Select
                            style={{ width: "100%" ,position:"absolute", bottom:"4px"}}
                            native
                            labelId="search-type-label"
                            value={typeOfSearch}
                            onChange={onTypeChange}
                            // inputProps={{
                            //     name: 'age',
                            //     id: 'age-native-simple',
                            // }}
                        >
                            {/* <option aria-label="Type" value="" /> */}
                            <option value="restaurant">Restaurant</option>
                            <option value="cuisine">Cusine</option>
                            <option value="chef">Chef</option>
                        </Select>
                    </Grid>
                    <Grid item md={3} style={{marginLeft:"8px"}} >
                        <TextField style={{ width: "100%" }} label="Zip Code" name="zipcode" value={zipCode} onChange={onZipChange} />
                    </Grid>
                    <Grid item md={4} >
                        <TextField style={{ width: "100%" }} label="Search for a chef, restarunt or cuisine" name="search" value={searchTerm} onChange={onSearchChange} />
                    </Grid>
                    {/* <span id="search-button">Search</span> */}
                    <Grid item md={1} style={{display:"flex", alignItems:"center", justifyContent:"center", paddingBottom:"0px"}}>
                        <Button style={{}} size="large" onSubmit={onSearchSubmit}> Search </Button> <br />
                    </Grid>
                </Grid>
            {/* </div> */}
            <hr style={{ marginTop: "10px" }} />
            <div className="search-result-gallery">
                <Grid container spacing={2}>
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                    <SearchCard />
                </Grid>
            </div>

        </div>
    )
}
