// React
import React from 'react'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    button:{
        marginTop: "20px"
    },
	inputText: {
        color: "#f5f5f5"
    }
}));

function EditChefModal(props) {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4" gutterBottom>
            Edit Profile
            </Typography>
            <form onSubmit={props.handleFormSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="h6">
                                Chef
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.first} type="text" name="first" label="First Name"/>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.last} type="text" name="last" label="Last Name"/>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.username} type="text" name="username" label="Username"/>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.contactInfo.email} type="text" name="email" label="Email"/>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.zipcode} type="text" name="zipcode" label="Zipcode"/>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.profilePic} type="text" name="profilePic" label="Profile Picture URL"/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <TextField fullWidth onChange={props.handleInputChange} multiline rows={2} value={props.chef.bio} type="text" name="bio" label="Bio"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                        <Typography variant="h6">
                            Cuisine & Specialty
                        </Typography>
                        <FormGroup row>
                            {props.populateCuisine(true)}
                            {props.populateSpecialty(true)}
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Button className={classes.button} type="submit" variant="contained" color="secondary">Save Changes</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default EditChefModal;