'use client'

interface StatusBadgeProps {
  status: string
}

const statusConfig: Record<string, string> = {
  ativo: 'bg-green-100 text-green-800',
  pago: 'bg-green-100 text-green-800',
  realizado: 'bg-green-100 text-green-800',
  aceita: 'bg-green-100 text-green-800',
  publicado: 'bg-green-100 text-green-800',
  'disponível': 'bg-green-100 text-green-800',
  pendente: 'bg-yellow-100 text-yellow-800',
  inativo: 'bg-red-100 text-red-800',
  atrasado: 'bg-red-100 text-red-800',
  recusada: 'bg-red-100 text-red-800',
  'indisponível': 'bg-red-100 text-red-800',
  rascunho: 'bg-gray-100 text-gray-800',
  enviada: 'bg-blue-100 text-blue-800',
  planejado: 'bg-purple-100 text-purple-800',
  'manutenção': 'bg-orange-100 text-orange-800',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const classes = statusConfig[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
