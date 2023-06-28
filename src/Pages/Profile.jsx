import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import './Home.css';


function Profile() {
  return (
    <Container sx={{
      width: '140rem',
      height: '32rem',
      maxHeight: '32rem',
      border: '1px solid blue',
      borderRadius: '10px',
      py: '3rem',
      px: '3rem',
      fontSize: '18px',
      backgroundColor: 'white',
      textAlign: 'center',
    }}>

      <h2>Perfil</h2>
    </Container>
  );
}

export default Profile;


