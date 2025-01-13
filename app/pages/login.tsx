import { useState } from "react";
import axios from 'axios';
import { TextField, Button, Container, Typography } from "@mui/material";
import Router from 'next/router';

const Login = () => {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null<(null); // State for error Message

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null); //Reset error message before each submission
        try {
            const response = await axios.post('/api/auth', { email, password });
            localStorage.setItem('token', response.data.token);
            Router.push('/users'); // Redirect for the users page
        } catch (error) {
            // Using type to assertion to specify the expected type of error
            if (axios.isAxiosError(error)) {
                // Check if error is an Axios error
                setErrorMessage(error.response?.data.message || "An error ocurred during login.");
            } else {
                // Handle generic errors
                setErrorMessage("An expected error occured.")
            }
        }
    };
    
    return (
        <Container>
            <form onSubmit={handleSubmit}>
                {errorMessage && (
                    <Typography color="error" variant="body2" align="center">
                        {errorMessage}
                    </Typography>
                )}
                <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />
                <TextField
                label="Senha"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Entrar
                </Button>
            </form>
        </Container>
    );
};

export default Login;