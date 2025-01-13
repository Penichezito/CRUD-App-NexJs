import { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Typography, Button, List, ListItem} from '@mui/material';
import Dashboard from "../components/Dashboard";

const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      };
      fetchProducts();
    }, []);

    return (
        <Dashboard>
          <Container>
            <Typography variant="h4" gutterBottom>
              Produtos
            </Typography>
            <Button variant="contained" color="primary" onClick={() => alert('Adicionar Produto')}>
              Adicionar Produto
            </Button>
            <List>
              {products.map(product => (
                <ListItem key={product.id}>
                  {product.name} - R${product.price} - Estoque: {product.stock}
                </ListItem>
              ))}
            </List>
          </Container>
        </Dashboard>
      );
    };
    
    export default Products;