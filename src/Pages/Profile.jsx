import React, { useState, useEffect, useContext, ReactElement } from 'react'
import Api from '../Api'
import Container from '@mui/material/Container';

import ReactLoading from 'react-loading';

import { AuthContext } from '../Contexts/AuthContext';

import DismissAlert from '../Components/DismissAlert';

import { Navigate } from 'react-router-dom';



import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';


const InlineEdit = ({ label, value, setValue, editStudent }) => {
  const [editingValue, setEditingValue] = useState(value);
  const onChange = (event) => setEditingValue(event.target.value);
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.target.blur();
    }
  }

  const onBlur = async (event) => {
    if (event.target.value.trim() === "") {
      setEditingValue(value);
    } else {
      if (event.target.value !== value) {
        setValue(event.target.value)
        if (label == "name") {
          await editStudent('name', event.target.value)
        }
        if (label == "phone") {
          await editStudent('phone', event.target.value)
        }
      }

    }
  }


  return (
    <input
      type="text"
      aria-label="Field name"
      value={editingValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onBlur={onBlur} />
  )
}


function Profile() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const { authenticated, loading, setLoading, error, setError, errorType, setErrorType } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState([])
  const [userWithdraws, setUserWithdraws] = useState([])

  const editStudent = async (label, value) => {
    setLoading(true)
    let res
    try {
      if (label == 'name') {
        res = await Api.put('/students', {
          name: value
        })
      }
      if (label == 'phone') {
        res = await Api.put('/students', {
          phone: value
        })
      }

    }
    catch (error) {
      fecthUserInfo()
      setErrorType('error')
      setError(error.response.data)
    }
    if (res) {
      fecthUserInfo()
      setErrorType('success')
      setError(res.data)
    }
    setLoading(false)
  }

  const givebackBook = async (name) => {
    setLoading(true)
    let res
    try {
      res = await Api.post('/giveback', {
        name
      })
    }
    catch (error) {
      setErrorType('error')
      setError(error.response.data)
    }
    if (res) {
      setErrorType('success')
      setError(res.data)
      fecthUserInfo()
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
    }
    if (res) {
      setUserInfo(res.data)
      setName(res.data.name)
      setPhone(res.data.phone)
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
      setErrorType('error')
      setError(error.response.data)
    }
    if (res) {
      setUserWithdraws(res.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    setError("")
    fecthUserInfo()
    fecthUserWithdraws()

  }, [])


  function RenderProfileInfo({ userInfo, withdraws }) {
    if (userInfo && withdraws) {
      return (
        <Box>
          <Box sx={{ mt: 1, mb: 3}}>
            <Typography variant="h4" component="h4" sx={{ textAlign: 'center' }}>Perfil - Controle</Typography>

          </Box>

          {error.length > 0 && (
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              <DismissAlert type={errorType} text={error} setText={setError} />
            </Box>
          )}

          {userInfo.length != 0 ? (
            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: 1, px: 4, py: 3, backgroundColor: 'white'}}>
              <p>Nome: <InlineEdit label="name" value={name} setValue={setName} editStudent={editStudent} /></p>
              <p>Telefone: <InlineEdit label="phone" value={phone} setValue={setPhone} editStudent={editStudent} /></p>
              <p>Retiradas: {userInfo.withdraw}</p>
            </Box>
          ) : (
            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: 1, px: 4, py: 3 ,backgroundColor: 'white'}}>
              <p>Nome: <ReactLoading type='spin' color='black' height={25} width={25} /></p>
              <p>Telefone: <ReactLoading type='spin' color='black' height={25} width={25} /></p>
              <p>Retiradas: <ReactLoading type='spin' color='black' height={25} width={25} /></p>
            </Box>
          )}

          <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: 1, mt: 6, pb:2,  px: 3 ,backgroundColor: 'white'}}>
            <Typography variant="h5" component="h5" sx={{ textAlign: 'center', p: 4, mt: 5 }}>Livros Alugados</Typography>

            <TableContainer component={Paper} sx={{ mb: 8, border: '1px solid black' }}>
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
                          ) : (
                            <TableCell align="left">Devolvido</TableCell>
                          )}

                        </TableRow>
                      )
                    })
                  ) : (
                    <Typography sx={{ ml: 3, py: 2 }}>Nenhum livro alugado</Typography>
                  )}
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

  if (!authenticated) {
    <Navigate to="/signin" />
  }


  return (
    <Box sx={{
      px: 6, 
      py: 4, 
      mt: 8, 
      background: '##ffefba',
      background: '-webkit-linear-gradient(to right, #ffefba, #ffffff)',
      background: 'linear-gradient(to right, #ffefba, #ffffff)'
    }}>
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