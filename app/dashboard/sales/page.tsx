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
  MenuItem,
} from '@mui/material'
import axios from 'axios'

interface User {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

interface Sale {
  id: number
  user: User
  product: Product
  quantity: number
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    productId: '',
    quantity: '',
  })

  useEffect(() => {
    loadSales()
    loadUsers()
    loadProducts()
  }, [])

  const loadSales = async () => {
    const response = await axios.get('/api/sales')
    setSales(response.data)
  }

  const loadUsers = async () => {
    const response = await axios.get('/api/users')
    setUsers(response.data)
  }

  const loadProducts = async () => {
    const response = await axios.get('/api/products')
    setProducts(response.data)
  }

  const handleOpen = () => {
    setFormData({ userId: '', productId: '', quantity: '' })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = {
        ...formData,
        userId: parseInt(formData.userId),
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
      }

      await axios.post('/api/sales', data)
      handleClose()
      loadSales()
      loadProducts() // Recarrega produtos para atualizar estoque
    } catch (error) {
      console.error('Erro ao registrar venda:', error)
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Nova Venda
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cliente</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.user.name}</TableCell>
                <TableCell>{sale.product.name}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(sale.product.price * sale.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova Venda</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="normal"
            fullWidth
            label="Cliente"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="normal"
            fullWidth
            label="Produto"
            value={formData.productId}
            onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} - Estoque: {product.stock}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Quantidade"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            Registrar Venda
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}