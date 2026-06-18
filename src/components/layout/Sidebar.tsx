'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  FileText,
  Video,
  Briefcase,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Camera,
  Sparkles,
  BarChart2,
  Settings,
  Zap,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/empresas', label: 'Empresas', icon: Building2 },
  { href: '/contratos', label: 'Contratos', icon: FileText },
  { href: '/videos', label: 'Vídeos', icon: Video },
  { href: '/servicos', label: 'Serviços', icon: Briefcase },
  { href: '/funcionarios', label: 'Funcionários', icon: Users },
  { href: '/eventos', label: 'Eventos', icon: Calendar },
  { href: '/equipamentos', label: 'Equipamentos', icon: Camera },
  { href: '/propostas', label: 'Propostas IA', icon: Sparkles },
  { href: '/relatorios', label: 'Relatórios', icon: BarChart2 },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [financeiroOpen, setFinanceiroOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ backgroundColor: '#0F172A' }}>
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-slate-700">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-sm leading-tight">SERTÃO GEST</p>
          <p className="text-blue-400 font-bold text-xs leading-tight">PRO</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}

          {/* Financeiro submenu */}
          <li>
            <button
              onClick={() => setFinanceiroOpen(!financeiroOpen)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/financeiro')
                  ? 'bg-blue-700 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <DollarSign className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left">Financeiro</span>
              {financeiroOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {financeiroOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link
                    href="/financeiro/entradas"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive('/financeiro/entradas')
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <TrendingUp className="w-4 h-4" /> Entradas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/financeiro/saidas"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive('/financeiro/saidas')
                        ? 'bg-blue-700 text-white'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <TrendingDown className="w-4 h-4" /> Saídas
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {navItems.slice(5).map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
            JL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Joselito</p>
            <p className="text-slate-400 text-xs truncate">Administrador</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg text-sm transition-colors">
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg text-white"
        style={{ backgroundColor: '#0F172A' }}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 h-full">
            <SidebarContent />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setMobileOpen(false)}
          />
        </div>
      )}
    </>
  )
}
