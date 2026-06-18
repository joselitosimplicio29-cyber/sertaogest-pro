'use client'

import Sidebar from './Sidebar'
import Header from './Header'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/empresas': 'Empresas',
  '/contratos': 'Contratos',
  '/videos': 'Vídeos',
  '/servicos': 'Serviços',
  '/financeiro/entradas': 'Financeiro - Entradas',
  '/financeiro/saidas': 'Financeiro - Saídas',
  '/funcionarios': 'Funcionários',
  '/eventos': 'Eventos',
  '/equipamentos': 'Equipamentos',
  '/propostas': 'Propostas IA',
  '/relatorios': 'Relatórios',
  '/configuracoes': 'Configurações',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'SertãoGest Pro'

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
