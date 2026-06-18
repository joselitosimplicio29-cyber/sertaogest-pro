import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', title: 'Proposta Cobertura Prefeitura 2026', company: 'Prefeitura Municipal', value: 50000, status: 'enviada' },
    { id: '2', title: 'Pacote Casamento Premium', value: 8500, status: 'aceita' },
    { id: '3', title: 'Proposta TV Sertão Q2', company: 'TV Sertão', value: 25000, status: 'rascunho' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
