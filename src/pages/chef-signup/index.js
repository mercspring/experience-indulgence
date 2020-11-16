import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import "./index.css"
import API from "../../utils/API"

export default function ChefSignup() {
  let [info, setInfo] = useState({ name: "", email: "", bio: "", zip: "", password:"", username:""});
  let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
  let [highlightStore, setHighlightStore] = useState([]);
  let [cuisinesState, setCuisinesState] = useState({});
  let [specialitiesState, setSpecialitiesState] = useState({});

  const widget = cloudinary.createUploadWidget({
    cloudName: 'mercspring',
    uploadPreset: 'ml_default', folder: 'widgetUpload', cropping: true, sources: ['local', 'url', 'image_search', 'camera', 'google_drive'], googleApiKey: 'AIzaSyDkWnsHj5yjXat0zVLA9cyISwhn1F5sq0E'
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
    }
  }
  );

  const generateObject = (typeArr) => {
    let obj = {};
    for (let i = 0; i < typeArr.length; i++) {
      obj[typeArr[i]] = false;
    }
    console.log(obj);
    return obj;
  }

  let [services, setServicesState] = useState([]);

  useEffect(() => {
    API.getAllCuisines()
      .then(res => {
        const cuisines = res.data.map(elm => elm.name)
        setCuisinesState(generateObject(cuisines));

      }
      )
      .catch(err => console.log(err));
    API.getAllSpecialties()
      .then(res => {
        const specialities = res.data.map(elm => elm.name)
        setSpecialitiesState(generateObject(specialities));
      }
      )
      .catch(err => console.log(err));
    API.getAllServices()
      .then(res => setServicesState(res.data)
      )
      .catch(err => console.log(err));
  }, [])

  function onInfoChange(event) {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  }
  function onHightlightsChange(event) {
    const { name, value } = event.target;
    setHighlights({ ...highlights, [name]: value });
  }
  function onAddHighlight(event) {
    event.preventDefault();
    if (highlights.workPlace) {
      setHighlightStore([...highlightStore, highlights]);
      setHighlights({ workPlace: "", jobTitle: "", duration: "" });
    } else {
      return
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(info, highlightStore);
    setHighlights({ workPlace: "", jobTitle: "", duration: "" });
    setHighlightStore([]);
    setInfo({ name: "", email: "", bio: "", zip: "", password:"", username:""});
  }

  function onSpecialityChange(event) {
    const { name, checked } = event.target;
    setSpecialitiesState({ ...specialitiesState, [name]: checked });

  } function onCuisinesChange(event) {
    const { name, checked } = event.target;
    setCuisinesState({ ...cuisinesState, [name]: checked });
  }
  function generateSpecialitiesCheckBoxes() {

    const keys = Object.keys(specialitiesState)

    return keys.map((speciality,index) => {
      return (<FormControlLabel
        control={<Checkbox name={speciality} checked={specialitiesState[speciality]} onChange={onSpecialityChange} />}
        label={speciality}
        key = {index}
      />)
    })
  }

  function generateCuisinesCheckBoxes() {

    const keys = Object.keys(cuisinesState)
    return keys.map((cuisine,index) => {
      return(<FormControlLabel
        control={<Checkbox name={cuisine} checked={cuisinesState[cuisine]} onChange={onCuisinesChange} />}
        label={cuisine}
        key={index}
      />)
    })


  }

  const styles = {
    input: {
      width: 300,
    },
    label: {
      fontSize: 13
    },
    card: {
      backgroundColor: "white",
      width: 300,
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: 7
    }
  };

  return (

    <form sytle={{ width: "80%", margin: "auto" }} noValidate autoComplete="off">
      <Grid style={{ width: "80%", margin: "auto" }} container spacing={2}>
        <Grid item s={4}>
          <h2>Profile</h2>
          <TextField style={styles.input} label="Name" name="name" value={info.name} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="Email" name="email" value={info.email} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="zip" name="zip" value={info.zip} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="username" name="username" value={info.username} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="password" name="password" value={info.password} onChange={onInfoChange} /><br />
          <Button onClick={widget.open}> Upload Profile Pic </Button>
          <Button onClick={onSubmit}> Submit </Button>
        </Grid>

        <Grid item s={4}>
          <h2>Experience</h2>
          {highlightStore.map((elm, index) => {
            return (<div key={index} style={styles.card}>
              <p style={styles.label}> <strong >Place of Work: </strong> {elm.workPlace}</p>
              <p style={styles.label}> <strong style={styles.label}>Job Title: </strong>{elm.jobTitle}</p>
              <p style={styles.label}> <strong style={styles.label}>Duration: </strong>{elm.duration}</p>
            </div>)
          })}
          <TextField style={styles.input} label="Job title" name="jobTitle" onChange={onHightlightsChange} value={highlights.jobTitle} /><br />
          <TextField style={styles.input} label="Place of Work" name="workPlace" onChange={onHightlightsChange} value={highlights.workPlace} /><br />
          <TextField style={styles.input} label="Duration" name="duration" onChange={onHightlightsChange} value={highlights.duration} /><br />
          <Button onClick={onAddHighlight}> Add Highlight </Button>
        </Grid>
        <Grid item s={4}>

          <h2>Food Photos</h2>
          <Button onClick={widget.open}> Upload Image </Button>
          <h2>Dietary Specialties</h2>
          <FormGroup>
            {generateSpecialitiesCheckBoxes()}
          </FormGroup>
          <h2>Cusines</h2>
          <FormGroup>
            {generateCuisinesCheckBoxes()}
          </FormGroup>




        </Grid>
      </Grid>

    </form>
  );
}