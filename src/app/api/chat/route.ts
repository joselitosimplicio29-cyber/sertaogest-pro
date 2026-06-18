import { NextResponse } from 'next/server'

const responses = [
  'Com base nos seus dados, recomendo focar em contratos de longo prazo com a Prefeitura Municipal.',
  'Para otimizar seus serviços de vídeo, considere criar pacotes especiais para eventos corporativos.',
  'Analisando seu fluxo financeiro, seus meses mais fortes são março e junho.',
  'Recomendo investir em equipamentos de drone para ampliar seus serviços de cobertura aérea.',
  'Sua equipe está com boa capacidade. Considere contratar um editor adicional para atender a demanda crescente.',
]

export async function POST(request: Request) {
  const { message } = await request.json()
  console.log('Chat message received:', message)
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  return NextResponse.json({ response: randomResponse, timestamp: new Date().toISOString() })
}
