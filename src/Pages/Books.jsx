import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import ReactLoading from 'react-loading';

import { Navigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { AuthContext } from '../Contexts/AuthContext';
import DismissAlert from '../Components/DismissAlert';

import SearchComponent from '../Components/Search';


import Api from '../Api.js';

function Books() {
    const [data, setData] = useState([])
    const { authenticated, error, setError, handleLogout, setLoading, loading } = useContext(AuthContext)
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    console.debug("AUTH: ", authenticated)
    console.debug("ACCESS: ", accessToken)
    console.debug("REFRESH: ", refreshToken)
    console.debug("LOADING: ", loading)
    //FIRST POPUP A CONFIRMATION
    //CHECK CONFIRMATION
    //PROCEED WITH WITHDRAW REQUEST
    //SHOW MESSAGE ACCORDINGLY WITH THE RESULT
    function withdrawBook() {

    }

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {


            let res
            try {
                res = await Api.get('/books')
            }
            catch (err) {
                if (err.response.status == 401) {
                    console.log(err.response.statusText)
                    setError(`${err.response.statusText}: ${err.response.data.message}`)
                    setLoading(false)
                } else {
                    console.log(err.response.statusText)
                    setError(`${err.response.statusText}: ${err.response.data.message}`)
                }

                // setError(err.response.data)
            }

            if (res) {
                setError("")
                setData(res.data);
            }



            // console.log(res.data)
            setLoading(false);

        };

        fetchData();

    }, []);

    if (loading) {
        return (
            <Container sx={{ py: 6, backgroundColor: 'transparent' }} maxWidth="lg">
                <h1>Catalogo de Livros</h1>
                <ReactLoading type='spin' color='white' height={450} width={375} />
            </Container>
        )
    }

    if (!authenticated) {
        return <Navigate to='/signin' />
    }
    
    else {
        return (
            <Container sx={{ py: 6, backgroundColor: 'transparent' }} maxWidth="lg">
                <h1>Catalogo de Livros</h1>
                {/* End hero unit */}
               <SearchComponent data={data} setData={setData}/> 
                <Grid container spacing={4}>
                    {data.length > 0 && data.map((book) => (
                        <Grid item key={book.isbn} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '100%'
                                    }}
                                    image={book.img_url}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h6" component="h6">
                                        {book.name}
                                    </Typography>
                                    <Typography>
                                        Autor: {book.author}
                                    </Typography>
                                    <Typography>
                                        Editora: {book.publisher}
                                    </Typography>
                                    <Typography>
                                        Estoque: {book.stock}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => withdrawBook()} size="small">Retirar</Button>
                                    <Button size="small">Editar</Button>
                                    <Button size="small">Excluir</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}

export default Books;

