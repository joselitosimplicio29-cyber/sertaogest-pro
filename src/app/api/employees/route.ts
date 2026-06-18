import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Maria Silva Santos', cpf: '111.111.111-11', role: 'Editora', department: 'Produção', salary: 3500, status: 'ativo' },
    { id: '2', name: 'Pedro Costa Lima', cpf: '222.222.222-22', role: 'Cinegrafista', department: 'Produção', salary: 4000, status: 'ativo' },
    { id: '3', name: 'Ana Oliveira Souza', cpf: '333.333.333-33', role: 'Designer', department: 'Criação', salary: 3000, status: 'ativo' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
