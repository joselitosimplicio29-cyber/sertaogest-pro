import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Câmera Sony A7 IV', brand: 'Sony', category: 'Câmeras', purchaseValue: 18000, status: 'disponível' },
    { id: '2', name: 'DJI Mavic 3 Pro', brand: 'DJI', category: 'Drones', purchaseValue: 12000, status: 'disponível' },
    { id: '3', name: 'Rode VideoMic Pro+', brand: 'Rode', category: 'Áudio', purchaseValue: 2500, status: 'disponível' },
    { id: '4', name: 'Godox SL-150W', brand: 'Godox', category: 'Iluminação', purchaseValue: 1800, status: 'manutenção' },
  ])
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ ...body, id: Date.now().toString() }, { status: 201 })
}
