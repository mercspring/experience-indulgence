import React, { useState, useEffect } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import "./index.css"

export default function ChefSignup() {
  let [info, setInfo] = useState({ name: "", email: "", bio: "", cusines: "" })
  let [highlights, setHighlights] = useState({ workPlace: "", highlights: "", duration: "" })
  let [highlightStore, setHighlightStore] = useState([])

  function onInfoChange(event) {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value })
  }
  function onHightlightsChange(event) {
    const { name, value } = event.target;
    setHighlights({ ...highlights, [name]: value })
  }
  function onAddHighlight(event) {
    event.preventDefault();
    if (highlights.workPlace) {
      setHighlightStore([...highlightStore, highlights])
      setHighlights({ workPlace: "", highlights: "", duration: "" })
    } else {
      return
    }
  }

  function onSubmit(event){
    event.preventDefault();
    console.log(info,highlightStore)
    setHighlights({ workPlace: "", highlights: "", duration: "" });
    setHighlightStore([]);
    setInfo({ name: "", email: "", bio: "", cusines: "" });
  }

  const styles = {
    input: {
      width: 300,
    },
    label:{
      fontSize: 13
    },
    card:{
      backgroundColor: "white",
      width: 300,
      marginRight: "auto",
      marginLeft: "auto",
      borderRadius: 7
    }
  }

  return (

    <form noValidate autoComplete="off">
      <TextField style={styles.input} label="Name" name="name" value={info.name} onChange={onInfoChange} /><br />
      <TextField style={styles.input} label="Email" name="email" value={info.email} onChange={onInfoChange} /><br />
      <TextField style={styles.input} label="Best Cusines" name="cusines" value={info.cusines} onChange={onInfoChange} /><br />
      <TextField style={styles.input} label="Bio" name="bio" multiline rows={4} value={info.bio} onChange={onInfoChange} /><br />
      <h2>Hightlights of Industry Expreience</h2>
      {highlightStore.map((elm,index) => {
        return (<div key={index} style={styles.card}>
          <p style={styles.label}> <strong >Place of Work: </strong> {elm.workPlace}</p>
          <p style={styles.label}> <strong style={styles.label}>Highlights: </strong>{elm.highlights}</p>
          <p style={styles.label}> <strong style={styles.label}>Duration: </strong>{elm.duration}</p>
        </div>)
      })}
      <TextField style={styles.input} label="Place of Work" name="workPlace" onChange={onHightlightsChange} value={highlights.workPlace} /><br />
      <TextField style={styles.input} label="Highlights" name="highlights" onChange={onHightlightsChange} multiline rows={4} value={highlights.highlights} /><br />
      <TextField style={styles.input} label="Duration" name="duration" onChange={onHightlightsChange} value={highlights.duration} /><br />
      <Button onClick={onAddHighlight}> Add Highlight </Button>
      <Button onClick={onSubmit}> Submit </Button>
    </form>
  );
}