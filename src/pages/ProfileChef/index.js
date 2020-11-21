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

		const payload = Object.assign(chef, { photos: file });
		console.log(payload)
		const userToken = JSON.parse(localStorage.getItem("userData")).token
		API.editChef(payload, userToken).then(chefData=>{
			//loadChef()
		})
	}
	function loadCuisines() {
		API.getAllCuisines(id)
		.then(res => {
			setChef(res.data)
			console.log(res.data)
		})
		.catch(err => console.log(err));
	}
	

	let [file, setFile] = useState("");
	function uploadToCloudinary() {
		console.log(file);
		reader(file).then( result => {
		axios.post("https://api.cloudinary.com/v1_1/mercspring/upload", { upload_preset: 'ml_default', file: result })
			.then(result => {
			console.log(result.data)
			console.log(result.data.secure_url)
			let chefPhotos = [];
			chefPhotos.push({ url: result.data.secure_url, title: file.name })
			setFile(chefPhotos);
			})
			.catch(err => {
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
	
	return (
		<Grid container xs={12}>
			<Grid item xs={3}>
				<ChefCard 
				openEdit={openEdit}
				handleOpenEdit={handleOpenEdit}
				handleCloseEdit={handleCloseEdit}
				openAdd={openAdd}
				handleOpenAdd={handleOpenAdd}
				handleCloseAdd={handleCloseAdd}
				handleInputChange={handleInputChange} 
				handleFormSubmit={handleFormSubmit} 
				chef={chef}
				file={file}
				fileChange={(event) => setFile(event.target.files[0])}
				uploadToCloudinary={uploadToCloudinary}
				/>
			</Grid>
			<Grid item xs={9}>
				<ChefImages chef={chef}/>
			</Grid>
		</Grid>
	);
}

export default ProfileChef;