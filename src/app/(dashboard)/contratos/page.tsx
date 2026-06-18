'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'

interface Contract {
  id: string
  name: string
  company: string
  value: string
  startDate: string
  endDate: string
  description: string
  responsible: string
  status: string
}

const initial: Contract[] = [
  { id: '1', name: 'Contrato Prefeitura 2026', company: 'Prefeitura Municipal', value: 'R$ 50.000', startDate: '2026-01-01', endDate: '2026-12-31', description: 'Cobertura de eventos municipais', responsible: 'Joselito', status: 'ativo' },
  { id: '2', name: 'Cobertura TV Sertão', company: 'TV Sertão', value: 'R$ 25.000', startDate: '2026-03-01', endDate: '2026-06-30', description: 'Produção de conteúdo jornalístico', responsible: 'Maria Silva', status: 'ativo' },
  { id: '3', name: 'Festival 2026', company: 'Eventos Bahia', value: 'R$ 15.000', startDate: '2026-06-01', endDate: '2026-06-30', description: 'Cobertura do festival junino', responsible: 'Pedro Santos', status: 'pendente' },
]

const empty: Contract = { id: '', name: '', company: '', value: '', startDate: '', endDate: '', description: '', responsible: '', status: 'ativo' }
const companies = ['Prefeitura Municipal', 'TV Sertão', 'Eventos Bahia']

export default function ContratosPage() {
  const [contracts, setContracts] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Contract | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (c: Contract) => { setEditing(c); setForm(c); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Nome é obrigatório'
    if (!form.value.trim()) errs.value = 'Valor é obrigatório'
    if (!form.startDate) errs.startDate = 'Data início é obrigatória'
    if (!form.endDate) errs.endDate = 'Data fim é obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setContracts(prev => prev.map(c => c.id === editing.id ? { ...form, id: editing.id } : c))
    } else {
      setContracts(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir este contrato?')) setContracts(prev => prev.filter(c => c.id !== id))
  }

  const field = (label: string, key: keyof Contract, type = 'text', required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}{required ? ' *' : ''}</label>
      <input type={type} value={form[key] as string} onChange={(e) => setForm(f => ({ ...f, [key]: e.target.value }))}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[key] ? 'border-red-500' : 'border-gray-200'}`} />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Contrato
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Nome', 'Empresa', 'Valor', 'Data Início', 'Data Fim', 'Status', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contracts.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.company}</td>
                  <td className="px-4 py-3 text-gray-600">{c.value}</td>
                  <td className="px-4 py-3 text-gray-600">{c.startDate}</td>
                  <td className="px-4 py-3 text-gray-600">{c.endDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => remove(c.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Contrato' : 'Novo Contrato'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('Nome', 'name', 'text', true)}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <select value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione...</option>
              {companies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {field('Valor', 'value', 'text', true)}
          {field('Data Início', 'startDate', 'date', true)}
          {field('Data Fim', 'endDate', 'date', true)}
          {field('Responsável', 'responsible')}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ativo">Ativo</option>
              <option value="pendente">Pendente</option>
              <option value="inativo">Inativo</option>
            </select>
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
