import React, {useEffect, useState} from 'react'
import { db } from "../firebase-config";
import { collection, getDocs, addDoc} from "firebase/firestore";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Modal from '@mui/material/Modal';


const ExerciseModal = () => {

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

  return (
    <>
      <Box sx={style}>
        
      </Box>
    </>
  )
}


function workouts() {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [workouts, setWorkouts] = useState([]);

  const workoutsCollectionRef = collection(db, "workouts");

  useEffect(() => {
    const getWorkouts = async () => {
      const data = await getDocs(workoutsCollectionRef);
      console.log(data)
      setWorkouts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
  
    getWorkouts();
  })



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
                <Button onClick={handleOpen}>View</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  >
                  <ExerciseModal/>
                </Modal>
              </Grid>
            </>
              
          } )}
        </Grid>
      </Container>
    </div>
  )
}

export default workouts