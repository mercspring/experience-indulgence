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
  let [info, setInfo] = useState({ name: "", email: "", bio: "", zip: "" });
  let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
  let [highlightStore, setHighlightStore] = useState([]);
  let cusines = ["mexican", "japanese", "indian", "ethiopian", "french", "italian", "korean"];
  let specialities= ["gluten-free", "vegan", 'vegetarian', "desert"];
  const cusinesObject = new checkboxObject(cusines);
  const specialitiesObject = new checkboxObject(specialities);
  let [cusinesState, setCusinesState] = useState(cusinesObject.generateObject());
  let [specialitiesState, setSpecialitiesState] = useState(specialitiesObject.generateObject());

  const widget = cloudinary.createUploadWidget({
    cloudName: 'mercspring',
    uploadPreset: 'ml_default', folder: 'widgetUpload', cropping: true, sources: ['local', 'url', 'image_search', 'camera', 'google_drive', 'facebook', 'instagram'], googleApiKey: 'AIzaSyDkWnsHj5yjXat0zVLA9cyISwhn1F5sq0E'
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
    }
  }
  );

  function checkboxObject(typeArr) {
    this.arr = typeArr;
    this.generateObject = () => {
      let obj = {};
      for (let i = 0; i < this.arr.length; i++) {
        obj[this.arr[i]] = false;
      }
      return obj;
    }
  }

  let [services, setServicesState] = useState([]);

  useEffect(() => {
    API.getAllCuisines()
      .then(res => {cuisines = res.map(elm => elm.name)}
      )
      .catch(err => console.log(err));
    API.getAllSpecialties()
      .then(res => {specialities = res.map(elm => elm.name)}
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
    setInfo({ name: "", email: "", bio: "", zip: "" });
  }

  function onSpecialityChange(event) {
    const { name, checked } = event.target;
    setSpecialitiesState({ ...dietState, [name]: checked });

  } function onCusinesChange(event) {
    const { name, checked } = event.target;
    setCusinesState({ ...cusinesState, [name]: checked });

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

    <form sytle={{width:"80%", margin:"auto"}}noValidate autoComplete="off">
      <Grid style={{width:"80%", margin:"auto"}}container spacing={2}>
        <Grid item s={4}>
          <h2>Profile</h2>
          <TextField style={styles.input} label="Name" name="name" value={info.name} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="Email" name="email" value={info.email} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="zip" name="zip" value={info.zip} onChange={onInfoChange} /><br />
          {/* <TextField style={styles.input} label="Best Cusines" name="cusines" value={info.cusines} onChange={onInfoChange} /><br /> */}
          <TextField style={styles.input} label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} /><br />
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
          {/* <TextField style={styles.input} label="Highlights" name="highlights" onChange={onHightlightsChange} multiline rows={4} value={highlights.highlights} /><br /> */}
          <TextField style={styles.input} label="Duration" name="duration" onChange={onHightlightsChange} value={highlights.duration} /><br />
          <Button onClick={onAddHighlight}> Add Highlight </Button>
        </Grid>
        <Grid item s={4}>
          
          <h2>Food Photos</h2>
          <Button onClick={widget.open}> Upload Image </Button>
          <h2>Dietary Specialties</h2>
          <FormGroup>
            {specialitiesObject.arr.map(speciality  => {
              return (<FormControlLabel
                control={<Checkbox name={speciality} checked={specialitiesState[speciality]} onChange={onSpecialityChange} />}
                label={diet}
              />)
            })}
          </FormGroup>
          <h2>Cusines</h2>
          <FormGroup>
            {cusinesObject.arr.map(cusine => {
              return (<FormControlLabel
                control={<Checkbox name={cusine} checked={cusinesState[cusine]} onChange={onCusinesChange} />}
                label={cusine}
              />)
            })}
          </FormGroup>



        </Grid>
      </Grid>

    </form>
  );
}