'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'

interface Event {
  id: string
  name: string
  company: string
  date: string
  location: string
  type: string
  hasCoverage: boolean
  price: string
  description: string
  status: string
}

const initial: Event[] = [
  { id: '1', name: 'Casamento Silva & Santos', company: '', date: '2026-06-22', location: 'Recife - PE', type: 'Casamento', hasCoverage: true, price: 'R$ 5.000', description: '', status: 'planejado' },
  { id: '2', name: 'Formatura UESB 2026', company: 'Prefeitura Municipal', date: '2026-06-28', location: 'Vitória da Conquista - BA', type: 'Formatura', hasCoverage: true, price: 'R$ 8.000', description: '', status: 'planejado' },
  { id: '3', name: 'Festival de Forró', company: 'Eventos Bahia', date: '2026-07-01', location: 'Feira de Santana - BA', type: 'Festival', hasCoverage: true, price: 'R$ 12.000', description: '', status: 'planejado' },
  { id: '4', name: 'Aniversário da Cidade', company: 'Prefeitura Municipal', date: '2026-07-15', location: 'Umburanas - BA', type: 'Institucional', hasCoverage: true, price: 'R$ 6.000', description: '', status: 'pendente' },
]

const empty: Event = { id: '', name: '', company: '', date: '', location: '', type: 'Casamento', hasCoverage: false, price: '', description: '', status: 'planejado' }
const types = ['Casamento', 'Formatura', 'Festival', 'Institucional', 'Aniversário', 'Corporativo', 'Outros']

export default function EventosPage() {
  const [events, setEvents] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (e: Event) => { setEditing(e); setForm(e); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Nome é obrigatório'
    if (!form.date) errs.date = 'Data é obrigatória'
    if (!form.location.trim()) errs.location = 'Local é obrigatório'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setEvents(prev => prev.map(e => e.id === editing.id ? { ...form, id: editing.id } : e))
    } else {
      setEvents(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir este evento?')) setEvents(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Evento
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Nome', 'Empresa', 'Data', 'Local', 'Tipo', 'Cobertura', 'Preço', 'Status', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.name}</td>
                  <td className="px-4 py-3 text-gray-600">{e.company || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{e.date}</td>
                  <td className="px-4 py-3 text-gray-600">{e.location}</td>
                  <td className="px-4 py-3 text-gray-600">{e.type}</td>
                  <td className="px-4 py-3">{e.hasCoverage ? <span className="text-green-600 font-medium">Sim</span> : <span className="text-gray-400">Não</span>}</td>
                  <td className="px-4 py-3 text-gray-600">{e.price || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
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

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Evento' : 'Novo Evento'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data do Evento *</label>
            <input type="date" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Local *</label>
            <input value={form.location} onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
            <input value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} placeholder="R$ 0,00"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="planejado">Planejado</option>
              <option value="pendente">Pendente</option>
              <option value="realizado">Realizado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="hasCoverage" checked={form.hasCoverage} onChange={(e) => setForm(f => ({ ...f, hasCoverage: e.target.checked }))}
              className="w-4 h-4 accent-blue-700" />
            <label htmlFor="hasCoverage" className="text-sm font-medium text-gray-700">Tem Cobertura</label>
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
