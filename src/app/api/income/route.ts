import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', origin: 'Contrato Prefeitura - Março', value: 15000, date: '2026-03-01', paymentStatus: 'pago', paymentMethod: 'Transferência' },
    { id: '2', origin: 'Serviço Casamento Silva', value: 3500, date: '2026-05-10', paymentStatus: 'pago', paymentMethod: 'PIX' },
    { id: '3', origin: 'Vídeo Institucional TV Sertão', value: 8000, date: '2026-05-20', paymentStatus: 'pendente' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
