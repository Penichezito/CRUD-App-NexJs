import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const products = await prisma.product.findMany();
        return res.status(200).json(products);
    } else if (req.method === 'POST') {
        const { name, price, stock } = req.body;
        const product = await prisma.product.create({
            data: {name, price, stock },
        });
        return res.status(201).json(product);
    }
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}