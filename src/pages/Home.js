import React, { createElement } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { rootShouldForwardProp } from '@mui/material/styles/styled';

//Break this into components and comment

function Home() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sets, setSets] = React.useState('');

  const handleSets = (event) => {
    setSets(event.target.value);
  };

  const [reps, setReps] = React.useState('');

  const handleReps = (event) => {
    setReps(event.target.value);
  };

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

  //Button onClick should spawn an identical unfilled row
  //Add "Track" button
  //Upon track being clicked, data should write to the db
  
  return (
    <div>
      <h1>Welcome, user</h1>
      <Button onClick={handleOpen}>Create New Workout</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        </Box>
      </Modal>
    </div>
  );
}

export default Home