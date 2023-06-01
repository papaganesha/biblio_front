import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

function Login({ setToken }) {
    const navigate = useNavigate();
    const [regId, setRegId] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/v1/signin', {
                regId,
                password,
            });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="regid"
                    label="Registration ID"
                    name="regid"
                    autoComplete="regid"
                    autoFocus
                    value={regId}
                    onChange={(e) => setRegId(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Sign In
                </Button>
            </form>
        </div>
    );
}

export default Login;