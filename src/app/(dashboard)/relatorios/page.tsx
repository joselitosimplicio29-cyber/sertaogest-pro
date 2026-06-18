'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts'

const monthlyRevenue = [
  { mes: 'Jan', Receita: 38000, Despesas: 15000, Lucro: 23000 },
  { mes: 'Fev', Receita: 42000, Despesas: 18000, Lucro: 24000 },
  { mes: 'Mar', Receita: 51000, Despesas: 20000, Lucro: 31000 },
  { mes: 'Abr', Receita: 37000, Despesas: 14000, Lucro: 23000 },
  { mes: 'Mai', Receita: 49000, Despesas: 22000, Lucro: 27000 },
  { mes: 'Jun', Receita: 45200, Despesas: 18500, Lucro: 26700 },
]

const serviceTypes = [
  { name: 'Cobertura de Eventos', value: 18, color: '#1E40AF' },
  { name: 'Vídeo Institucional', value: 12, color: '#FF8C00' },
  { name: 'Fotografia', value: 9, color: '#10B981' },
  { name: 'Edição', value: 5, color: '#8B5CF6' },
  { name: 'Transmissão ao Vivo', value: 3, color: '#EF4444' },
]

const equipmentByCategory = [
  { category: 'Câmeras', qty: 8, value: 'R$ 96.000' },
  { category: 'Drones', qty: 2, value: 'R$ 24.000' },
  { category: 'Áudio', qty: 5, value: 'R$ 12.500' },
  { category: 'Iluminação', qty: 6, value: 'R$ 10.800' },
  { category: 'Computadores', qty: 2, value: 'R$ 44.000' },
]

export default function RelatoriosPage() {
  const [tab, setTab] = useState<'financeiro' | 'servicos' | 'equipamentos'>('financeiro')
  const [startDate, setStartDate] = useState('2026-01-01')
  const [endDate, setEndDate] = useState('2026-12-31')

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex gap-2">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <span className="text-gray-400 self-center">até</span>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" /> Exportar
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {([['financeiro', 'Financeiro'], ['servicos', 'Serviços'], ['equipamentos', 'Equipamentos']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'financeiro' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Receitas e Despesas Mensais</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `R$ ${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString('pt-BR')}`} />
              <Legend />
              <Bar dataKey="Receita" fill="#1E40AF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Despesas" fill="#FF8C00" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Lucro" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'servicos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Serviços por Tipo</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={serviceTypes} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name">
                  {serviceTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-4">Detalhamento</h2>
            <div className="space-y-3">
              {serviceTypes.map(s => (
                <div key={s.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{s.name}</span>
                      <span className="font-medium text-gray-800">{s.value} serviços</span>
                    </div>
                    <div className="mt-1 bg-gray-100 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full" style={{ width: `${(s.value / 47) * 100}%`, backgroundColor: s.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'equipamentos' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Equipamentos por Categoria</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Categoria</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Quantidade</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Valor Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipmentByCategory.map(e => (
                <tr key={e.category} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.category}</td>
                  <td className="px-4 py-3 text-gray-600">{e.qty} unidades</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">{e.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
