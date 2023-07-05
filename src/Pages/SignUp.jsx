import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Contexts/AuthContext.js';

import ReactLoading from 'react-loading';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import DismissAlert from '../Components/DismissAlert.jsx';

import { NavLink } from "react-router-dom";



const defaultTheme = createTheme();

export default function SignUp() {
    const [data, setData] = useState([])
    const { authenticated, handleLogin, handleRegister, error, setError, loading, setLoading } = useContext(AuthContext)


    useEffect(() => {
        setError("")
    }, [])

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        setError('')
        const data = new FormData(event.currentTarget);

        await handleRegister(data.get('name'), data.get('phone'), data.get('password'));
        setTimeout(() => setLoading(false), 2000)
    };



    return (
        <Box sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: "columns",
            alignItems: 'center',
            justifyContent: 'center',
            pt: 8,
            background: '#009fff',
            background: '-webkit-linear-gradient(to right, #009fff, #ec2f4b)',
            background: 'linear-gradient(to right, #009fff, #ec2f4b)'

        }}>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ width: '130vh', height: '73vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
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
                            <Typography component="h1" variant="h5" sx={{ p: 0, mt: 1 }}>Cadastro</Typography>
                            {error.length > 0 && (<DismissAlert type="error" text={error} setText={setError} />)}
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    name="name"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Telefone"
                                    type="text"
                                    id="phone"
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

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? (<ReactLoading type='spin' color='cyanblue' height={25} width={25} />) : ('Cadastrar')}
                                </Button>
                                <Grid container >
                                    <Grid item>
                                        <NavLink to="/signin">
                                            {"Ja possui uma conta? Login"}
                                        </NavLink>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Box>
    );
}