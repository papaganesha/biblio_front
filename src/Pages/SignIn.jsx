import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext.js';

import ReactLoading from 'react-loading';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DismissAlert from '../Components/DismissAlert.jsx';

import { NavLink } from "react-router-dom";
import axios from 'axios';



const defaultTheme = createTheme();

export default function SignIn() {
    const [data, setData] = useState([])
    const {authenticated, handleLogin, error, setError, loading, setLoading} = useContext(AuthContext)

    console.debug("Login Auth",authenticated)
    console.debug("Loading",loading)

    useEffect(()=>{
    })

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        setError('')
        const data = new FormData(event.currentTarget);
        console.log({
            regId: data.get('regId'),
            password: data.get('password'),
        });
        
        await handleLogin(data.get('regId'), data.get('password'));
        setTimeout(() => setLoading(false), 2000)
    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ width: '130vh', height: '70vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5.6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mt: '0.5rem' }}>
                            Login
                        </Typography>
                        {error.length > 0 && (<DismissAlert type="error" text={error} setError={setError}/>)}
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="regId"
                                label="Id de Registro"
                                name="regId"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                sx={{ mt: 1 }}
                                control={<Checkbox value="remember" color="primary" />}
                                label="Lembrar de mim"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? (<ReactLoading type='spin' color='cyanblue' height={25} width={25} />) : ('Entrar')}
                            </Button>
                            <Grid container >
                                <Grid item>
                                    <NavLink to="/register">
                                        {"Não possui uma conta? Cadastre-se"}
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}