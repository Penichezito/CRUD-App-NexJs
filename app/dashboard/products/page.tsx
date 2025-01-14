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

interface Product {
  id: number
  name: string
  price: number
  stock: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    const response = await axios.get('/api/products')
    setProducts(response.data)
  }

  const handleOpen = (product?: Product) => {
    if (product) {
      setSelectedProduct(product)
      setFormData({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
      })
    } else {
      setSelectedProduct(null)
      setFormData({ name: '', price: '', stock: '' })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      }

      if (selectedProduct) {
        await axios.put(`/api/products/${selectedProduct.id}`, data)
      } else {
        await axios.post('/api/products', data)
      }
      handleClose()
      loadProducts()
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Deseja realmente excluir este produto?')) {
      try {
        await axios.delete(`/api/products/${id}`)
        loadProducts()
      } catch (error) {
        console.error('Erro ao deletar produto:', error)
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
        Novo Produto
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(product.price)}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(product)}>Editar</Button>
                  <Button 
                    color="error"
                    onClick={() => handleDelete(product.id)}
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
          {selectedProduct ? 'Editar Produto' : 'Novo Produto'}
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
            label="Preço"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Estoque"
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
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