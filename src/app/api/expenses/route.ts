import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', type: 'Aluguel de Equipamento', value: 2500, date: '2026-05-01', supplier: 'Locadora Pro', category: 'Equipamentos' },
    { id: '2', type: 'Software de Edição', value: 450, date: '2026-05-05', supplier: 'Adobe', category: 'Software' },
    { id: '3', type: 'Combustível', value: 800, date: '2026-05-10', supplier: 'Posto BR', category: 'Transporte' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
