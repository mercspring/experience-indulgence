// React
import React, { useState, useEffect } from "react";
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from "@material-ui/core/Grid"
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button"
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "20px 0",
		padding: "20px"
	},
	button:{
		margin: "20px 0 20px 0",
		display: "block"
	},
	grid:{
		marginBottom: "20px"
	}
}));

function Signup() {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
				<Grid container spacing={2}>
					<Grid item lg={12}>
						<Typography variant="h3" gutterBottom>
							Sign Up
						</Typography>
					</Grid>
				</Grid>
			<form noValidate autoComplete="off">
				<Grid container spacing={2}>
					<Grid item lg={6}>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5">
									Account
								</Typography>
								<TextField fullWidth label="Username" name="username" value={info.username} onChange={onInfoChange} />
								<TextField fullWidth label="Password" name="password" value={info.password} onChange={onInfoChange} />
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5" gutterBottom>
									Photo
								</Typography>

								<Button variant="contained" component="label" startIcon={<CloudUploadIcon />} onChange={(event) => setFile(event.target.files[0])} val={file}>Upload<input type="file" hidden /></Button>

								<Button className={classes.button} variant="contained" color="secondary" onClick={() => uploadToCloudinary(file)}>Save Profile Pic</Button>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5">
									Profile
								</Typography>
								<TextField fullWidth label="First Name" name="first" value={info.first} onChange={onInfoChange} />
								<TextField fullWidth label="Last Name" name="last" value={info.last} onChange={onInfoChange} />
								<TextField fullWidth label="Email" name="email" value={info.email} onChange={onInfoChange} />
								<TextField fullWidth label="Zip Code" name="zip" value={info.zip} onChange={onInfoChange} />
								<TextField fullWidth label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} />
							</Grid>
						</Grid>
						<Button className={classes.button} variant="contained" color="primary" onClick={onSubmit}>Create Profile</Button>
					</Grid>
					<Grid item lg={6}>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5">
									Experience
								</Typography>
								{highlightStore.map((elm, index) => {
									return (<div key={index}>
									<p> <strong>Place of Work: </strong> {elm.workPlace}</p>
									<p> <strong>Job Title: </strong>{elm.jobTitle}</p>
									<p> <strong>Duration: </strong>{elm.duration}</p>
									</div>)
								})}
								<TextField fullWidth label="Job title" name="jobTitle" onChange={onHightlightsChange} value={highlights.jobTitle} />
								<TextField fullWidth label="Place of Work" name="workPlace" onChange={onHightlightsChange} value={highlights.workPlace} />
								<TextField fullWidth label="Duration" name="duration" onChange={onHightlightsChange} value={highlights.duration} />
								<Button className={classes.button} variant="contained" color="secondary" onClick={onAddHighlight}>Add Experience</Button>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5" gutterBottom>
									Dietary Specialties
								</Typography>
								<FormGroup row>
									{generateSpecialitiesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
						<Grid container className={classes.grid}>
							<Grid item lg={12}>
								<Typography variant="h5" gutterBottom>
									Cusines
								</Typography>
								<FormGroup row>
									{generateCuisinesCheckBoxes()}
								</FormGroup>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
}

export default Signup;