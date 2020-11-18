import React, { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import "./index.css"
import API from "../../utils/API"
import axios from "axios";

export default function ChefSignup() {
  let [info, setInfo] = useState({ first: "", last: "", email: "", bio: "", zip: "", password: "", username: "" });
  let [highlights, setHighlights] = useState({ workPlace: "", jobTitle: "", duration: "" });
  let [highlightStore, setHighlightStore] = useState([]);
  let [cuisinesState, setCuisinesState] = useState({});
  let [specialitiesState, setSpecialitiesState] = useState({});
  let [profilePicture, setProfilePicture] = useState('');
  let [services, setServicesState] = useState([]);
  let [file, setFile] = useState("");


 
  const generateObject = (typeArr) => {
    let obj = {};
    for (let i = 0; i < typeArr.length; i++) {
      const name = typeArr[i].name
      obj[name] = { id: typeArr[i].id, checked: false }
    }
    return obj;
  }

  useEffect(() => {

    API.getAllCuisines()
      .then(res => {
        const cuisines = res.data.map(elm => { return { name: elm.name, id: elm._id } })
        console.log(cuisines)
        setCuisinesState(generateObject(cuisines));

      }
      )
      .catch(err => console.log(err));
    API.getAllSpecialties()
      .then(res => {
        const specialities = res.data.map(elm => { return { name: elm.name, id: elm._id } })
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
    console.log(Object.keys(cuisinesState));
    let chefsCuisines = [];
    let chefsSpecialities = [];

    Object.keys(cuisinesState).forEach(key => {
      if (cuisinesState[key].checked) {
        chefsCuisines.push(cuisinesState[key].id)
      }
    })

    Object.keys(specialitiesState).forEach(key => {
      if (specialitiesState[key].checked) {
        chefsSpecialities.push(specialitiesState[key].id)
      }
    })


    const payload = Object.assign(info, { restaurant: JSON.stringify(highlightStore) }, { cusines: chefsCuisines, speciality: chefsSpecialities, profilePic: profilePicture })
    console.log(payload)
    API.createProfile(payload)
      .then(result => {
        console.log(result);

      }).catch(err => {
        console.log(err);
      });

    //Empty Forms
    setHighlights({ workPlace: "", jobTitle: "", duration: "" });
    setHighlightStore([]);
    setInfo({ first: "", last: "", email: "", bio: "", zip: "", password: "", username: "" });
    setProfilePicture("")
    setCuisinesState({});
    setSpecialitiesState({});
    setServicesState([]);
  }

  function onSpecialityChange(event) {
    const { name, checked } = event.target;
    setSpecialitiesState({ ...specialitiesState, [name]: { checked: checked, id: specialitiesState[name].id } });

  } function onCuisinesChange(event) {
    const { name, checked } = event.target;
    setCuisinesState({ ...cuisinesState, [name]: { checked: checked, id: cuisinesState[name].id } });
  }
  function generateSpecialitiesCheckBoxes() {

    const keys = Object.keys(specialitiesState)

    return keys.map((speciality, index) => {
      return (<FormControlLabel
        control={<Checkbox name={speciality} checked={specialitiesState[speciality].checked} onChange={onSpecialityChange} />}
        label={speciality}
        key={index}
      />)
    })
  }

  function generateCuisinesCheckBoxes() {

    const keys = Object.keys(cuisinesState)
    return keys.map((cuisine, index) => {
      return (<FormControlLabel
        control={<Checkbox name={cuisine} checked={cuisinesState[cuisine].checked} onChange={onCuisinesChange} />}
        label={cuisine}
        key={index}
      />)
    })


  }
  function uploadToCloudinary() {
    console.log(file);

    reader(file).then( result => {
      axios.post("https://api.cloudinary.com/v1_1/mercspring/upload", { upload_preset: 'ml_default', file: result })
        .then(result => {
          console.log(result.data)
          setProfilePicture(result.data.secure_url);
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


    <form style={{ width: "95%", margin: "auto" }} noValidate autoComplete="off">
      <Grid style={{ width: "95%", margin: "auto" }} container spacing={2}>
        <Grid item s={4}>
          <h2>Profile</h2>
          <TextField style={styles.input} label="First Name" name="first" value={info.first} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="Last Name" name="last" value={info.last} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="Email" name="email" value={info.email} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="zip" name="zip" value={info.zip} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="username" name="username" value={info.username} onChange={onInfoChange} /><br />
          <TextField style={styles.input} label="password" name="password" value={info.password} onChange={onInfoChange} /><br />
          <input style={{marginTop: "5px"}}onChange={(event) => setFile(event.target.files[0])} type="file" val={file} /> <br />
          <Button onClick={() => uploadToCloudinary(file)}> Upload Profile Pic </Button> <br />
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