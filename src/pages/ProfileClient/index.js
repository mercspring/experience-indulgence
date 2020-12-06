// React
import React, { useState, useEffect } from "react";
// Styles
import { Grid, Card, CardContent, Button, CardActions, Typography } from '@material-ui/core/';
import { LinearProgress } from '@material-ui/core';
// Components
import { useParams } from "react-router-dom";
// API
import axios from "axios";
import API from "../../utils/API"

export default function ClientProfile() {
    const [client, setClient] = useState([])
    const { id } = useParams();
    async function loadClient() {
        const res = await API.getClient(id)
        setClient(res.data)
        console.log(res.data)
    }
    useEffect(async () => {
        await loadClient()
    }, [])
    return (
        <Grid container justify="space-between">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4"> {client.first + " " + client.last}</Typography>
                        <Typography variant="h5">Address</Typography>
                        {client.addressId ?
                            <React.Fragment>
                                <Typography > {client.addressId.street || ""}</Typography>
                                <Typography > {client.addressId.city + ", " + client.addressId.state}</Typography>
                                <Typography> {client.addressId.zipcode || ""}</Typography>
                            </React.Fragment>
                            : null}
                    </CardContent>
                    <CardActions>
                        <Button size="small">Edit Profile</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
            <Card style={{ width: "100%" }}>
                <CardContent>
                    messages go here
                </CardContent>
            </Card>
            </Grid>
        </Grid>

    )
}
