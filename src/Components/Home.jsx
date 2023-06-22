import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import ReactLoading from 'react-loading';


import './Home.css';
import BookCard from './BookCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:3000/api/v1/books', {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        // },
      });
      setData(res.data);
      // console.log(res.data)
    };
    fetchData();
  }, []);

  return (
    <Grid
    container spacing={10} sx={{ display: 'flex', flexDirection: 'row' , flexGrow: 1 }}
      >
      <Grid xs={12}>
        {data.length > 0 ? (
          data.map(book => (<Item><BookCard book={book} /></Item>))
        ) : (<ReactLoading type='spin' color='cyanblue' height={450} width={375} />)}
      </Grid>


    </Grid>
  );
}

export default Home;


