// React
import React from 'react'
// Styles
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
            <Typography variant="h4" gutterBottom>
            Add a Photo
            </Typography>
            <form onSubmit={props.handleFormSubmit}>
                <Grid container spacing={1}>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                        <Typography variant="h6">
                                Upload
                        </Typography>
                        <Button className={classes.button} variant="contained" component="label" onChange={props.fileChange} val={props.file}>Upload<input type="file" hidden /></Button>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={() => props.uploadToCloudinary(props.file)}>Save Photo</Button>	
                    </Grid>
                    <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
                        <Button className={classes.button} type="submit" variant="contained" color="secondary">Save Changes</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default EditChefModal;