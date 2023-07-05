import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import './Home.css';


function Home() {
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '##ffefba',
      background: '-webkit-linear-gradient(to right, #ffefba, #ffffff)',
      background: 'linear-gradient(to right, #ffefba, #ffffff)'
    }}>

    <Container sx={{
      width: '140rem',
      height: '36rem',
      maxHeight: '34rem',
      borderRadius: '10px',
      py: 4,
      fontSize: '18px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      mt: 6,
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
    }}>

      <h3>Bem-vindo(a) à nossa aplicação gerenciadora de biblioteca! </h3>
      <p>Aqui, você encontrará uma solução prática e eficiente para organizar e controlar todo o acervo da sua biblioteca de maneira simples e intuitiva. </p>
      <p>Seja você um bibliotecário profissional ou um apaixonado por livros, nossa aplicação foi projetada para atender às suas necessidades.  <br></br> <br></br>Com recursos avançados de catalogação, empréstimo,reserva e pesquisa, você terá total controle sobre os livros, periódicos e outros materiais disponíveis.</p>
      <p>Não importa se sua biblioteca é pequena ou grande, a nossa aplicação está pronta para facilitar seu trabalho e proporcionar uma experiência agradável aos usuários</p>
      <b>
        <p>Comece a explorar agora mesmo e desfrute de uma gestão bibliotecária eficiente e organizada!</p>
      </b>
    </Container>

    </Box>
    );
}

export default Home;
