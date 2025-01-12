import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient} from '@prisma/client;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if {req.method === 'POST') {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: {email} });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h'});
            return res.status(200).json( { token });
        } else {
            return res.status(401).json({ message: 'Credenciais Inválidas' });
        }
    }
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}