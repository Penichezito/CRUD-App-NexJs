import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const sales = await prisma.sale.findMany();
        return res.status(200).json(sales);
    } else if (req.method == 'POST') {
        const { userId, productId, quantity } = req.body;
        const sale = await prisma.sale.create({
            data: {userId, productId, quantity },
        });
        return res.status(201).json(sale);
    }
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}