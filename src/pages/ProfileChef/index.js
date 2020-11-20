// React
import React, { useState, useEffect } from "react";
// Styles
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// Components
import ChefCard from "../../components/ChefCard"
import ChefImages from "../../components/ChefFood"
import { useParams } from "react-router-dom";
// API
import API from "../../utils/API";

function ProfileChef() {
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => {
		setOpenEdit(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const [chef, setChef] = useState({})
	const {id} = useParams();
	function loadChef() {
		API.getChef(id)
		.then(res => {
			setChef(res.data)
			console.log(res.data)
		})
		.catch(err => console.log(err));
	}
	useEffect(() => {
		loadChef()
	}, [])
	const handleInputChange = event=>{
        const {name,value}=event.target;
        setChef({
            ...chef,
            [name]:value
        })
    }
    const handleFormSubmit = event=>{
        event.preventDefault();
		console.log('Updating.....')
		setOpenEdit(false);
		API.editChef(chef,localStorage.getItem("token")).then(chefData=>{
		}).then(() => loadChef())
	}
	
	return (
		<Grid container xs={12}>
			<Grid item xs={3}>
				<ChefCard 
				openEdit={openEdit}
				handleOpenEdit={handleOpenEdit}
				handleCloseEdit={handleCloseEdit}
				handleInputChange={handleInputChange} 
				handleFormSubmit={handleFormSubmit} 
				chef={chef}/>
			</Grid>
			<Grid item xs={9}>
				<ChefImages chef={chef}/>
			</Grid>
		</Grid>
	);
}

export default ProfileChef;