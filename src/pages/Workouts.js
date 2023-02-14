import React, {useEffect, useState} from 'react'
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, query, where} from "firebase/firestore";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';




function workouts({isAuth}) {

  //Redirict to login if user not logged in
  let navigate = useNavigate();
  useEffect(() => {
  if(isAuth === false){
    navigate('/login')
  }
}, [])

  //Style for modal
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

  //Setting up state and getting infor from storage
  const id = localStorage.getItem("userid");
  const [workouts, setWorkouts] = useState([]);
  const[workout, setWorkout] = useState();
  const workoutsCollectionRef = query(collection(db, "workouts"), where("uid", "==", id) );

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (workout) => {
    setWorkout(workout)
    setOpen(true);
  }

  //Get data from firebase
  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(workoutsCollectionRef);
      setWorkouts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
  
    getWorkouts();
  }, [])



  return (
    
    <div>
      <h1>My workouts:</h1>
      <Container>
        <Grid container spacing="2" >
          {workouts.map((workout) => {
            return <>
              <Grid item xs={4}>
                <h3>{workout.name}</h3>
              </Grid>
              <Grid item xs={4}>
                <h3>{workout.timestamp.substring(0,15)}</h3>
              </Grid>
              <Grid item xs={4}>
                <Button onClick={() => handleOpen(workout)}>View</Button>

              </Grid>
            </>
              
          } )}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <p>
              {workout && workout.exercises.map((exercise) =>{
              return<>
                <p>{exercise.name}&emsp;{exercise.reps}&ensp;x&ensp;{exercise.sets}&emsp;{exercise.weight}lbs</p>
              </>})}
            </p>
          </Box>
        </Modal>
      </Container>
    </div>
  )
}

export default workouts