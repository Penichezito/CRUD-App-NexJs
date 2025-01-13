import { useEffect, useState } from "react";
import axios from 'axios';
import { Container, Typography, List, ListItem } from "@mui/material";
import Dashboard from "../components/Dashboard";

const Sales = () => {
    const [sales, setSales] = useState<any[]>([]);

    useEffect(() => {
        const fetchSales = async () => {
            const response = await axios.get('api/sales');
            setSales(response.data);
        };
        fetchSales();
    }, []);

    return (
        <Dashboard>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Vendas
                </Typography>
                <List>
                    {sales.map(sale => (
                    <ListItem key={sale.id}>
                        Venda ID: {sale.id} - Usuário ID: {sale.userId} - Produto ID: {sale.productId} - Quantidade: {sale.quantity}
                    </ListItem>
                    ))}
                </List>
            </Container>
        </Dashboard>
    );
};

export default Sales;