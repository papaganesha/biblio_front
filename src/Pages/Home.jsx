import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import './Home.css';


function Home() {
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
    }}>

      <h3>Bem-vindo(a) à nossa aplicação gerenciadora de biblioteca! </h3>
      <p>Aqui, você encontrará uma solução prática e eficiente para organizar e controlar todo o acervo da sua biblioteca de maneira simples e intuitiva. </p>
      <p>Seja você um bibliotecário profissional ou um apaixonado por livros, nossa aplicação foi projetada para atender às suas necessidades. Com recursos avançados de catalogação, empréstimo, reserva e pesquisa, você terá total controle sobre os livros, periódicos e outros materiais disponíveis.</p>
      <p>Não importa se sua biblioteca é pequena ou grande, a nossa aplicação está pronta para facilitar seu trabalho e proporcionar uma experiência agradável aos usuários</p>
      <b>
        <p>Comece a explorar agora mesmo e desfrute de uma gestão bibliotecária eficiente e organizada!</p>
      </b>
    </Container>
  );
}

export default Home;

