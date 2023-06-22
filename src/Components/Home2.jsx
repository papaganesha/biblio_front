import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactLoading from 'react-loading';

import './Home.css';


import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



function Home2() {
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
        <Container sx={{ py: 6 }} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {data.length > 0 ? data.map((book) => (
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
                                <Button size="small">Retirar</Button>
                                <Button size="small">Editar</Button>
                                <Button size="small">Excluir</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )):(<ReactLoading type='spin' color='cyanblue' height={450} width={375} />)}
            </Grid>
        </Container>
    );
}

export default Home2;


