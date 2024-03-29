import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection, getDocs, addDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from 'react-router-dom';




//Component to create exercise creation row
const AddExerciseRow = ( {handleSets, handleReps, handleWeight, handleName, idx, name, sets, reps, weight }) => {
  
  return (
    <>
    <Grid item xs={4}>
      <TextField required id="outlined-basic" label="Exercise" variant="outlined" key={"name"} value={name} onChange={(e) => handleName(e, idx)}/>
    </Grid>

    <Grid item xs={1}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Sets</InputLabel>
          <Select required labelId="demo-simple-select-label" id="demo-simple-select" key={"sets"} value={sets} label="Sets" onChange={(e) => handleSets(e, idx)}>
            {[...(new Array(7))].map((_, idx) => <MenuItem value={idx+1} key={idx+1}>{idx + 1}</MenuItem>)}
          </Select>
      </FormControl>
    </Grid>

    <Grid item xs={1}>
      <p>X</p>
    </Grid>

    <Grid item xs={1}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Reps</InputLabel>
          <Select required labelId="demo-simple-select-label" id="demo-simple-select" key={"reps"} value={reps} label="Reps" onChange={(e) => handleReps(e, idx)}>
            {[...(new Array(20))].map((_, idx) => <MenuItem value={idx+1} key={idx+1}>{idx + 1}</MenuItem>)}
          </Select>
      </FormControl>
    </Grid>

    <Grid item xs={4}>
      <TextField required id="outlined-basic" label="Weight" variant="outlined" key={"weight"} value={weight} onChange={(e) => handleWeight(e, idx)}/>
    </Grid>
    </>
  )
}

function Home({ isAuth }) {
  //Code to make sure that the user cannot access the page if not logged in
  let navigate = useNavigate();
  useEffect(() => {
  if(isAuth === false){
    navigate('/login')
  }
}, [])

  //Logic for opening and closing modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Initialize array of exercises
  const [exercises, setExercises] = useState([  
    {}
  ])

  const [workoutName, setWorkoutName] = useState()

  //Style for modal box
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //Handle updates to all different fields in different locations

  const handleWorkoutName = (event) => {
    setWorkoutName( event.target.value)
  }

  const handleSets = (event, idx) => {
    setExercises(prevExercises => {
      const newExercise = {
        ...prevExercises[idx],
        sets: event.target.value,
      }
      const newArray = [...prevExercises]
      newArray[idx] = newExercise;
      return newArray;
    })
  };

  const handleReps = (event, idx) => {
    setExercises(prevExercises => {
      const newExercise = {
        ...prevExercises[idx],
        reps: event.target.value,
      }
      const newArray = [...prevExercises]
      newArray[idx] = newExercise;
      return newArray;
    })
  };

  const handleName = (event, idx) => {
    setExercises(prevExercises => {
      const newExercise = {
        ...prevExercises[idx],
        name: event.target.value,
      }
      const newArray = [...prevExercises]
      newArray[idx] = newExercise;
      return newArray;
    })
  }

  const handleWeight = (event, idx) => {
    setExercises(prevExercises => {
      const newExercise = {
        ...prevExercises[idx],
        weight: event.target.value,
      }
      const newArray = [...prevExercises]
      newArray[idx] = newExercise;
      return newArray;
    })
  }

  //Add the workout to firebase
  const handleTrackWorkout = async () => {
    console.log(exercises)
    const date = Date();
    const id = localStorage.getItem("userid");
    const workoutCollection = collection(db, "workouts")

    const newFields = {
      name: workoutName,
      exercises: exercises,
      timestamp: date,
      uid: id
    }
   
    await addDoc(workoutCollection, newFields)
    setExercises([{}])
    setWorkoutName("")
    handleClose();
  }

  //Add new exercise to array
  const handleAddExercise = () => {
    //Appending an empty object onto the end
    setExercises((previous) => {
      return [...previous, {}]
    })
  }

  const username = localStorage.getItem("name");

  
  return (
    <div>
      <h1>Welcome {username}</h1>
      <div className="createWorkout">
        <Button size="large" variant="contained" onClick={handleOpen}>Create New Workout</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing="2">
            <Grid item xs={12}>
              <div className="workout-name">
                <TextField required id="outlined-basic" label="Workout" key={"workoutName"} value={workoutName} onChange={(e) => handleWorkoutName(e)} variant="standard" />
              </div>
            </Grid>
            {exercises.map((exercise, idx) => <AddExerciseRow key={idx} idx={idx} {...exercise} handleSets={handleSets} handleName={handleName} handleReps={handleReps} handleWeight={handleWeight}/>)}
            <Grid item xs={9}>
              <div className="modal-Button">
                <Button variant="contained" onClick={handleAddExercise}>Add Exercise</Button>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className="modal-Button">
                <Button variant="contained" onClick={handleTrackWorkout}>Track Workout</Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default Home