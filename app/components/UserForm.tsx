// components/UserForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material'; // Ensure using Grid from @mui/material
import axios from 'axios';

interface UserFormProps {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email, password };

    // Envie os dados para a API
    try {
      await axios.post('/api/users', userData);
      onSubmit(userData);
      // Limpar os campos após o envio
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Adicionar Usuário
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
