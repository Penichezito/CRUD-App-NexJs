'use client'
import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import axios from 'axios'

interface User {
  id: number
  name: string
  email: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const response = await axios.get('/api/users')
    setUsers(response.data)
  }

  const handleOpen = (user?: User) => {
    if (user) {
      setSelectedUser(user)
      setFormData({ name: user.name, email: user.email, password: '' })
    } else {
      setSelectedUser(null)
      setFormData({ name: '', email: '', password: '' })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedUser) {
        await axios.put(`/api/users/${selectedUser.id}`, formData)
      } else {
        await axios.post('/api/users', formData)
      }
      handleClose()
      loadUsers()
    } catch (error) {
      console.error('Erro ao salvar usuário:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Deseja realmente excluir este usuário?')) {
      try {
        await axios.delete(`/api/users/${id}`)
        loadUsers()
      } catch (error) {
        console.error('Erro ao deletar usuário:', error)
      }
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen()}
        sx={{ mb: 2 }}
      >
        Novo Usuário
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user)}>Editar</Button>
                  <Button 
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            type="password"
            label="Senha"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}