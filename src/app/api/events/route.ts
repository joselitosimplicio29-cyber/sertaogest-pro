import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Casamento Silva & Santos', date: '2026-06-22', location: 'Recife - PE', type: 'Casamento', status: 'planejado' },
    { id: '2', name: 'Formatura UESB 2026', date: '2026-06-28', location: 'Vitória da Conquista - BA', type: 'Formatura', status: 'planejado' },
    { id: '3', name: 'Festival de Forró', date: '2026-07-01', location: 'Feira de Santana - BA', type: 'Festival', status: 'planejado' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
