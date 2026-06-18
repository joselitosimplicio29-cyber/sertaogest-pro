'use client'

import { LayoutDashboard, FileText, TrendingUp, TrendingDown, Users, Camera } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
import StatusBadge from '@/components/ui/StatusBadge'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

const financeData = [
  { mes: 'Jan', Entradas: 38000, Saídas: 15000 },
  { mes: 'Fev', Entradas: 42000, Saídas: 18000 },
  { mes: 'Mar', Entradas: 51000, Saídas: 20000 },
  { mes: 'Abr', Entradas: 37000, Saídas: 14000 },
  { mes: 'Mai', Entradas: 49000, Saídas: 22000 },
  { mes: 'Jun', Entradas: 45200, Saídas: 18500 },
]

const equipmentData = [
  { name: 'Câmeras', value: 8, color: '#1E40AF' },
  { name: 'Áudio', value: 5, color: '#FF8C00' },
  { name: 'Iluminação', value: 6, color: '#10B981' },
  { name: 'Drones', value: 2, color: '#8B5CF6' },
  { name: 'Outros', value: 2, color: '#6B7280' },
]

const eventos = [
  { id: 1, nome: 'Casamento Silva', data: '22/06/2026', local: 'Recife - PE', status: 'planejado' },
  { id: 2, nome: 'Formatura UESB', data: '28/06/2026', local: 'Vitória da Conquista - BA', status: 'confirmado' },
  { id: 3, nome: 'Festival de Forró', data: '01/07/2026', local: 'Feira de Santana - BA', status: 'planejado' },
  { id: 4, nome: 'Aniversário da Cidade', data: '15/07/2026', local: 'Umburanas - BA', status: 'confirmado' },
  { id: 5, nome: 'Campanha Prefeitura', data: '20/07/2026', local: 'Jacobina - BA', status: 'pendente' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Contratos Ativos" value="12" icon={<FileText className="w-5 h-5" />} change={8} changeLabel="este mês" color="bg-blue-600" />
        <StatCard title="Serviços Realizados" value="47" icon={<LayoutDashboard className="w-5 h-5" />} change={12} changeLabel="este mês" color="bg-green-500" />
        <StatCard title="Entradas do Mês" value="R$ 45.200" icon={<TrendingUp className="w-5 h-5" />} change={5} changeLabel="vs mês anterior" color="bg-emerald-500" />
        <StatCard title="Saídas do Mês" value="R$ 18.500" icon={<TrendingDown className="w-5 h-5" />} change={-3} changeLabel="vs mês anterior" color="bg-red-500" />
        <StatCard title="Total Funcionários" value="8" icon={<Users className="w-5 h-5" />} color="bg-purple-500" />
        <StatCard title="Total Equipamentos" value="23" icon={<Camera className="w-5 h-5" />} color="bg-orange-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Fluxo Financeiro</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `R$ ${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
              <Legend />
              <Line type="monotone" dataKey="Entradas" stroke="#1E40AF" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="Saídas" stroke="#FF8C00" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Equipamentos por Categoria</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={equipmentData} cx="50%" cy="50%" outerRadius={70} dataKey="value" nameKey="name">
                {equipmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {equipmentData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Próximos eventos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Próximos Eventos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Nome</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Data</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Local</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {eventos.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.nome}</td>
                  <td className="px-4 py-3 text-gray-600">{e.data}</td>
                  <td className="px-4 py-3 text-gray-600">{e.local}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick access */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Nova Empresa', href: '/empresas' },
          { label: 'Novo Contrato', href: '/contratos' },
          { label: 'Registrar Entrada', href: '/financeiro/entradas' },
          { label: 'Novo Evento', href: '/eventos' },
          { label: 'Gerar Proposta IA', href: '/propostas' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
