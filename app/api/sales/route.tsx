import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const sales = await prisma.sale.findMany({
    include: {
      user: true,
      product: true,
    },
  })
  return NextResponse.json(sales)
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    
    // Verificar estoque
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    })
    
    if (!product || product.stock < data.quantity) {
      return NextResponse.json(
        { error: 'Estoque insuficiente' },
        { status: 400 }
      )
    }
    
    // Criar venda e atualizar estoque em uma transação
    const sale = await prisma.$transaction(async (prisma) => {
      const sale = await prisma.sale.create({
        data,
        include: {
          user: true,
          product: true,
        },
      })
      
      await prisma.product.update({
        where: { id: data.productId },
        data: { stock: product.stock - data.quantity },
      })
      
      return sale
    })
    
    return NextResponse.json(sale)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar venda' },
      { status: 500 }
    )
  }
}