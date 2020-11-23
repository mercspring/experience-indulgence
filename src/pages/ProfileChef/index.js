// React
import React, { useState, useEffect } from "react";
// Styles
import Grid from '@material-ui/core/Grid';
import { LinearProgress } from '@material-ui/core';
// Components
import ChefCard from "../../components/ChefCard"
import ChefImages from "../../components/ChefFood"
import { useParams } from "react-router-dom";
// API
import axios from "axios";
import API from "../../utils/API"

function ProfileChef() {
	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => {
		setOpenEdit(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const [openAdd, setOpenAdd] = React.useState(false);
	const handleOpenAdd = () => {
		setOpenAdd(true);
	};
	const handleCloseAdd = () => {
		setOpenAdd(false);
	};


	let [file, setFile] = useState("");
	function uploadToCloudinary() {
		console.log(file);
		reader(file).then( result => {
		axios.post("https://api.cloudinary.com/v1_1/mercspring/upload", { upload_preset: 'ml_default', file: result })
			.then(result => {
			console.log(result.data)
			console.log(result.data.secure_url)
			setFile({ url: result.data.secure_url, title: file.name });
			console.log(file)
			}).catch(err => {
			console.log(err);
			})
		})
	}
	const reader = (file) => {
		return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = () => resolve(fileReader.result);
		fileReader.readAsDataURL(file);
		});
	}

	const [chef, setChef] = useState([])
	const {id} = useParams();
	async function loadChef() {
		const res = await API.getChef(id)
			setChef(res.data)
			console.log(res.data)
	}
	useEffect(async () => {
		await loadChef()
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
		setOpenAdd(false);
		const payload = Object.assign(chef, {cuisine:chef.cuisine.map(elm => elm._id)});
		console.log(payload)
		const userToken = JSON.parse(localStorage.getItem("userData")).token
		API.editChef(payload, userToken).then(chefData=>{
			console.log(chefData)
			loadChef()
		}).catch(err => console.log(err))
	}

	return (
		<Grid container spacing={1}>
			<Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
				{chef.specialty ? <ChefCard 
				openEdit={openEdit}
				handleOpenEdit={handleOpenEdit}
				handleCloseEdit={handleCloseEdit}
				openAdd={openAdd}
				handleOpenAdd={handleOpenAdd}
				handleCloseAdd={handleCloseAdd}
				handleInputChange={handleInputChange} 
				handleFormSubmit={handleFormSubmit} 
				setChef={setChef}
				chef={chef}
				file={file}
				fileChange={(event) => setFile(event.target.files[0])}
				uploadToCloudinary={uploadToCloudinary}
				/>: <LinearProgress />}
			</Grid>
			<Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
				{chef.photos ? 
				<ChefImages chef={chef}/>
				: <LinearProgress />
				}
			</Grid>
		</Grid>
	);
}

export default ProfileChef;