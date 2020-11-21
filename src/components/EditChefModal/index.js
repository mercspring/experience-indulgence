// React
import React from 'react'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    button:{
        marginTop: "20px"
    }
}));

function EditChefModal(props) {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h4">
            Edit Profile
            </Typography>
            <form onSubmit={props.handleFormSubmit}>
                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.username} type="text" name="username" />
                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.first} type="text" name="first" />
                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.last} type="text" name="last" />
                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.bio} type="text" name="bio" />
                <Button variant="contained" component="label" onChange={props.fileChange} val={props.file}>Upload<input type="file" hidden /></Button>
				<Button className={classes.button} variant="contained" color="secondary" onClick={() => props.uploadToCloudinary(props.file)}>Add Photo</Button>	
                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.zipcode} type="text" name="zipcode" />
                <TextField fullWidth onChange={props.handleInputChange} value={props.chef.profilePic} type="text" name="profilePic" />
                <FormGroup row>
                {props.chef.cuisine.map((cuisine) => (
                    <FormControlLabel
                    control={<Checkbox checked={true} onChange={props.handleInputChange} name="checkedA" />}
                    label={cuisine.name}
                    />
                ))}
                {props.chef.specialty.map((specialty) => (
                    <FormControlLabel
                    control={<Checkbox checked={true} onChange={props.handleInputChange} name="checkedA" />}
                    label={specialty.name}
                    />
                ))}
                </FormGroup>
                <Button className={classes.button} type="submit" variant="contained" color="secondary">Save Changes</Button>
            </form>
        </div>
    )
}

export default EditChefModal;