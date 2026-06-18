import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Contrato Prefeitura 2026', company: 'Prefeitura Municipal', value: 50000, startDate: '2026-01-01', endDate: '2026-12-31', status: 'ativo' },
    { id: '2', name: 'Cobertura TV Sertão', company: 'TV Sertão', value: 25000, startDate: '2026-03-01', endDate: '2026-06-30', status: 'ativo' },
    { id: '3', name: 'Festival 2026', company: 'Eventos Bahia', value: 15000, startDate: '2026-06-01', endDate: '2026-06-30', status: 'pendente' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
