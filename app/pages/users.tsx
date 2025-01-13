import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, List, ListItem } from '@mui/material';
import Dashboard from '../components/Dashboard';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <Dashboard>
      <Container>
        <Typography variant="h4" gutterBottom>
          Usuários
        </Typography>
        <Button variant="contained" color="primary" onClick={() => alert('Adicionar Usuário')}>
          Adicionar Usuário
        </Button>
        <List>
          {users.map(user => (
            <ListItem key={user.id}>
              {user.name} - {user.email}
            </ListItem>
          ))}
        </List>
      </Container>
    </Dashboard>
  );
};

export default Users;