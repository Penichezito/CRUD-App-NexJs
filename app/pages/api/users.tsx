import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == 'GET') {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } else if (req.method == 'POST') {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword },
        });
        return res.status(201).json(user);
    }
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(400).end(`Method ${req.method} Not Allowed`)
}