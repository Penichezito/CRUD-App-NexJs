// components/ProductForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material'; // Ensure using Grid from @mui/material
import axios from 'axios';

interface ProductFormProps {
  onSubmit: (data: { name: string; price: number; stock: number }) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = { name, price, stock };

    // Envie os dados para a API
    try {
      await axios.post('/api/products', productData);
      onSubmit(productData);
      // Limpar os campos após o envio
      setName('');
      setPrice(0);
      setStock(0);
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome do Produto"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Preço"
            variant="outlined"
            fullWidth
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Quantidade em Estoque"
            variant="outlined"
            fullWidth
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Adicionar Produto
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;



