import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Cobertura Fotográfica - Casamento', company: 'Particular', type: 'Fotografia', date: '2026-05-10', value: 3500, status: 'realizado' },
    { id: '2', name: 'Edição de Vídeo Institucional', company: 'TV Sertão', type: 'Edição', date: '2026-05-20', value: 2000, status: 'realizado' },
    { id: '3', name: 'Transmissão ao Vivo', company: 'Eventos Bahia', type: 'Transmissão', date: '2026-06-15', value: 1800, status: 'pendente' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
