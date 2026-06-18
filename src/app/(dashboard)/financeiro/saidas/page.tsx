'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, TrendingDown, Calendar, BarChart2 } from 'lucide-react'
import Modal from '@/components/ui/Modal'

interface Expense {
  id: string
  type: string
  value: string
  date: string
  supplier: string
  category: string
  description: string
}

const initial: Expense[] = [
  { id: '1', type: 'Aluguel de Equipamento', value: 'R$ 2.500', date: '2026-05-01', supplier: 'Locadora Pro', category: 'Equipamentos', description: '' },
  { id: '2', type: 'Software de Edição', value: 'R$ 450', date: '2026-05-05', supplier: 'Adobe', category: 'Software', description: 'Licença mensal Adobe Creative' },
  { id: '3', type: 'Combustível', value: 'R$ 800', date: '2026-05-10', supplier: 'Posto BR', category: 'Transporte', description: '' },
  { id: '4', type: 'Cartão de Memória', value: 'R$ 350', date: '2026-05-15', supplier: 'Loja Tech', category: 'Equipamentos', description: '' },
  { id: '5', type: 'Internet', value: 'R$ 200', date: '2026-06-01', supplier: 'Vivo', category: 'Infraestrutura', description: '' },
]

const empty: Expense = { id: '', type: '', value: '', date: '', supplier: '', category: 'Equipamentos', description: '' }
const categories = ['Equipamentos', 'Software', 'Transporte', 'Infraestrutura', 'Marketing', 'Funcionários', 'Outros']

export default function SaidasPage() {
  const [expenses, setExpenses] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (e: Expense) => { setEditing(e); setForm(e); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.type.trim()) errs.type = 'Tipo é obrigatório'
    if (!form.value.trim()) errs.value = 'Valor é obrigatório'
    if (!form.date) errs.date = 'Data é obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setExpenses(prev => prev.map(e => e.id === editing.id ? { ...form, id: editing.id } : e))
    } else {
      setExpenses(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir esta saída?')) setExpenses(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Gasto</p>
              <p className="text-lg font-bold text-gray-800">R$ 18.500</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Esta Semana</p>
              <p className="text-lg font-bold text-gray-800">R$ 3.200</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Este Mês</p>
              <p className="text-lg font-bold text-gray-800">R$ 18.500</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Nova Saída
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Tipo', 'Valor', 'Data', 'Fornecedor', 'Categoria', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.type}</td>
                  <td className="px-4 py-3 text-red-600 font-semibold">{e.value}</td>
                  <td className="px-4 py-3 text-gray-600">{e.date}</td>
                  <td className="px-4 py-3 text-gray-600">{e.supplier || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">{e.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(e)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => remove(e.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Saída' : 'Nova Saída'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <input value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.type ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor *</label>
            <input value={form.value} onChange={(e) => setForm(f => ({ ...f, value: e.target.value }))} placeholder="R$ 0,00"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.value ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.value && <p className="text-red-500 text-xs mt-1">{errors.value}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
            <input type="date" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fornecedor</label>
            <input value={form.supplier} onChange={(e) => setForm(f => ({ ...f, supplier: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={() => setModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancelar</button>
          <button onClick={save} className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800">{editing ? 'Salvar' : 'Criar'}</button>
        </div>
      </Modal>
    </div>
  )
}
