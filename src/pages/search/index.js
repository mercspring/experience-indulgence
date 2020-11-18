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
            <div style={{ display: "flex", justifyContent: "center" }}>
                {/* <InputLabel>Search Type</InputLabel> */}
                <Select
                    style={{width: "20%"}}
                    native
                    value={typeOfSearch}
                    onChange={onTypeChange}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Cusine</option>
                    <option value={20}>Restaurant</option>
                    <option value={30}>Chef</option>
                </Select>
                <TextField style={{ width: "20%" }} label="Zip Code" name="zipcode" value={zipCode} onChange={onZipChange} />
                <TextField style={{ width: "45%" }} label="Search for a chef, restarunt or cuisine" name="search" value={searchTerm} onChange={onSearchChange} />

                <Button style={{ padding: 0 }} size="small" onSubmit={onSearchSubmit}> Search </Button> <br />
            </div>
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
