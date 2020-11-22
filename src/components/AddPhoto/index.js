// React
import React from 'react'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
            Add a Photo
            </Typography>
            <form onSubmit={props.handleFormSubmit}>
                <Button variant="contained" component="label" onChange={props.fileChange} val={props.file}>Upload<input type="file" hidden /></Button>
				<Button className={classes.button} variant="contained" color="secondary" onClick={() => props.uploadToCloudinary(props.file)}>Save Photo</Button>	
                <Button className={classes.button} type="submit" variant="contained" color="secondary">Save Changes</Button>
            </form>
        </div>
    )
}

export default EditChefModal;