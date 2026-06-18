import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Prefeitura Municipal', cnpj: '00.000.000/0001-00', email: 'contato@prefeitura.gov.br', phone: '(74) 3000-0000', status: 'ativo' },
    { id: '2', name: 'TV Sertão', cnpj: '11.111.111/0001-11', email: 'tv@sertao.com.br', phone: '(74) 3111-1111', status: 'ativo' },
    { id: '3', name: 'Eventos Bahia', cnpj: '22.222.222/0001-22', email: 'eventos@bahia.com', phone: '(74) 3222-2222', status: 'inativo' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
