// React
import React, { useState, useEffect } from "react";
// Styles
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Components
import ChefCard from "../../components/ChefCard"
import ChefImages from "../../components/ChefFood"
import { useParams } from "react-router-dom";
import API from "../../utils/API";

function ProfileChef() {
	const [chef, setChef] = useState({})
	const {id} = useParams();
	useEffect(() => {
		API.getChef(id)
		.then(res => {
			setChef(res.data)
			console.log(res.data)
		})
		.catch(err => console.log(err));
	}, [])
	return (
		<Container maxWidth="lg" fixed>
			<Grid container xs={12}>
				<Grid item xs={3}>
					<ChefCard chef={chef}/>
				</Grid>
				<Grid item xs={9}>
					<ChefImages />
				</Grid>
			</Grid>
		</Container>
	);
}

export default ProfileChef;