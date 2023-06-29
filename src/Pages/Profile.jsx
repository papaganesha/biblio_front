import React, { useState, useEffect, useContext, ReactElement} from 'react'
import Api from '../Api'
import Container from '@mui/material/Container';

import ReactLoading from 'react-loading';

import './Home.css';

import { AuthContext } from '../Contexts/AuthContext';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element: ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function Profile() {
  const { authenticated } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState([])
  const [userWithdraws, setUserWithdraws] = useState([])


  useEffect(() => {
    const fecthUserInfo = async () => {
      let res
      try {
        res = await Api.get('/students')
      }
      catch (error) {
        console.log(error.response)
      }
      if (res) {
        console.log(res.data)
        setUserInfo(res.data)
      }
    }

    const fecthUserWithdraws = async () => {
      let res
      try {
        res = await Api.get('/withdraws')
      }
      catch (error) {
        console.log(error.response)
      }
      if (res) {
        console.log("WITHDRAW:", res.data)
        setUserWithdraws(res.data)
      }
    }

    fecthUserInfo()
    fecthUserWithdraws()
  }, [])

  function RenderProfileInfo({ userInfo, withdraws }) {
    console.log(userInfo, "--- ",withdraws)
    if (userInfo && withdraws) {
      return (
        <div>
          <h4>Nome: {userInfo.name}</h4>
          <h4>Telefone: {userInfo.phone}</h4>
          <h4>Retiradas: {userInfo.withdraw}</h4>
          
          <h4>Livros Alugados</h4>
          <Grid item xs={12} md={6}>
          <Demo>
            <List>

          {withdraws.length > 0 ? (
            withdraws.map((withdraw) => {
              return(
                <ListItem
                sx={{border: '1px solid black'}}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Isbn: ${withdraw.book_isbn}`}
                />
                <ListItemText
                primary={`Data retirada: ${withdraw.start_date}`}
              />
              <ListItemText
              primary={`Data retorno: ${withdraw.return_date}`}
            />
              <ListItemText
              primary={`Data devolução: ${withdraw.giveback_date}`}
            />
            <ListItemText
            primary={`Dias atraso: ${withdraw.late}`}
          />
              </ListItem>
              
              )
            })
          ) : ('Nenhum livro alugado')}

          </List>
          </Demo>
        </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <ReactLoading type='spin' color='black' height={450} width={375} />
        </div>
      )
    }
  }

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
      <RenderProfileInfo userInfo={userInfo} withdraws={userWithdraws} />
    </Container>
  );
}

export default Profile;

