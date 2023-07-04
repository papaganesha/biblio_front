import React, { useState, useEffect, useContext, ReactElement } from 'react'
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
import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';


const Demo = styled('Container')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

function Profile() {
  const { authenticated, loading, setLoading } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState([])
  const [userWithdraws, setUserWithdraws] = useState([])

  const givebackBook = async (name) => {
    console.log("name", name)
    setLoading(true)
    let res
    try {
      res = await Api.post('/giveback', {
        name
      })
    }
    catch (error) {
      console.log("gb error", error.response)
    }
    if (res) {
      console.log("giveback:", res.data)
      fecthUserWithdraws()
    }
    setLoading(false)
  }

  const fecthUserInfo = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  const fecthUserWithdraws = async () => {
    setLoading(true)
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
    setLoading(false)
  }

  useEffect(() => {
    fecthUserInfo()
    fecthUserWithdraws()

  }, [])

  function RenderProfileInfo({ userInfo, withdraws }) {
    console.log(userInfo, "--- ", withdraws)
    if (userInfo && withdraws) {
      return (
        <Box>
          <Box sx={{ mt:1, mb: 3 }}>
          <Typography variant="h4" component="h4" sx={{textAlign: 'center'}}>Perfil - Controle</Typography>

          </Box>

          <Box sx={{ border: '1px solid black', borderRadius: 1, px: 4, py: 3 }}>
            <p>Nome: {userInfo.name}</p>
            <p>Telefone: {userInfo.phone}</p>
            <p>Retiradas: {userInfo.withdraw}</p>
          </Box>

          <Box sx={{ border: '1px solid black', borderRadius: 1, mt: 5, px: 2}}>
          <Typography variant="h5" component="h5" sx={{textAlign: 'center', p: 2, mt:2}}>Livros Alugados</Typography>

          <TableContainer component={Paper} sx={{mt:2, mb: 8, border: '1px solid black'}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ISBN</TableCell>
                  <TableCell align="left">TITULO</TableCell>
                  <TableCell align="left">RETIRADA</TableCell>
                  <TableCell align="left">DATA DEVOLUCAO</TableCell>
                  <TableCell align="left">RETORNO</TableCell>
                  <TableCell align="left">ENTREGUE</TableCell>
                  <TableCell align="left">ATRASO</TableCell>
                  <TableCell align="left">DEVOLVER</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>

                {withdraws.length > 0 ? (
                  withdraws.map((withdraw) => {
                    return (

                      <TableRow
                        key={withdraw.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{withdraw.book_isbn}</TableCell>
                        <TableCell align="left">{withdraw.book_name}</TableCell>
                        <TableCell align="left">{withdraw.start_date}</TableCell>
                        <TableCell align="left">{withdraw.return_date}</TableCell>
                        <TableCell align="left">{withdraw.giveback_date}</TableCell>
                        <TableCell align="left">{withdraw.done ? "S" : "N"}</TableCell>
                        <TableCell align="left">{withdraw.late}</TableCell>
                        {withdraw.done !== true ? (
                          <TableCell align="left"><Button variant="contained" value={withdraw.book_name} onClick={async (e) => { await givebackBook(e.currentTarget.value) }}>Devolver</Button></TableCell>
                        ):(
                          <TableCell align="left">Devolvido</TableCell>
                        )}

                      </TableRow>
                    )
                  })
                ) : ('Nenhum livro alugado')}
              </TableBody>
            </Table>
          </TableContainer>
         </Box>
        </Box>
      )
    }
    if (loading) {
      return (
        <Container>
          <ReactLoading type='spin' color='black' height={450} width={375} />
        </Container>
      )
    }
  }

  return (
    <Box sx={{ px: 6, py: 4, mt: 8}}>
      <RenderProfileInfo userInfo={userInfo} withdraws={userWithdraws} />
    </Box>
  );
}

export default Profile;



// <ListItem
// sx={{ border: '1px solid black' }}
// secondaryAction={
//   withdraw.done !== true && <Button variant="contained" value={withdraw.book_name} onClick={async (e) => { await givebackBook(e.currentTarget.value) }}>Devolver</Button>
// }
// >