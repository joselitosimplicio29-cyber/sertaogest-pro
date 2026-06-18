'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'

interface Income {
  id: string
  origin: string
  value: string
  date: string
  company: string
  description: string
  paymentStatus: string
  paymentDate: string
  paymentMethod: string
}

const initial: Income[] = [
  { id: '1', origin: 'Contrato Prefeitura - Março', value: 'R$ 15.000', date: '2026-03-01', company: 'Prefeitura Municipal', description: '', paymentStatus: 'pago', paymentDate: '2026-03-05', paymentMethod: 'Transferência' },
  { id: '2', origin: 'Serviço Casamento Silva', value: 'R$ 3.500', date: '2026-05-10', company: '', description: '', paymentStatus: 'pago', paymentDate: '2026-05-12', paymentMethod: 'PIX' },
  { id: '3', origin: 'Vídeo Institucional TV Sertão', value: 'R$ 8.000', date: '2026-05-20', company: 'TV Sertão', description: '', paymentStatus: 'pendente', paymentDate: '', paymentMethod: '' },
  { id: '4', origin: 'Campanha Digital', value: 'R$ 5.200', date: '2026-05-25', company: 'Eventos Bahia', description: '', paymentStatus: 'pago', paymentDate: '2026-05-26', paymentMethod: 'PIX' },
  { id: '5', origin: 'Transmissão Festival', value: 'R$ 2.100', date: '2026-06-01', company: 'Eventos Bahia', description: '', paymentStatus: 'atrasado', paymentDate: '', paymentMethod: '' },
]

const empty: Income = { id: '', origin: '', value: '', date: '', company: '', description: '', paymentStatus: 'pendente', paymentDate: '', paymentMethod: '' }

export default function EntradasPage() {
  const [incomes, setIncomes] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Income | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (i: Income) => { setEditing(i); setForm(i); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.origin.trim()) errs.origin = 'Origem é obrigatória'
    if (!form.value.trim()) errs.value = 'Valor é obrigatório'
    if (!form.date) errs.date = 'Data é obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setIncomes(prev => prev.map(i => i.id === editing.id ? { ...form, id: editing.id } : i))
    } else {
      setIncomes(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir esta entrada?')) setIncomes(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Recebido</p>
              <p className="text-lg font-bold text-gray-800">R$ 45.200</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pendente</p>
              <p className="text-lg font-bold text-gray-800">R$ 8.500</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Atrasado</p>
              <p className="text-lg font-bold text-gray-800">R$ 2.100</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Nova Entrada
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Origem', 'Valor', 'Data', 'Empresa', 'Status', 'Método', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {incomes.map(i => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{i.origin}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">{i.value}</td>
                  <td className="px-4 py-3 text-gray-600">{i.date}</td>
                  <td className="px-4 py-3 text-gray-600">{i.company || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={i.paymentStatus} /></td>
                  <td className="px-4 py-3 text-gray-600">{i.paymentMethod || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(i)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => remove(i.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Entrada' : 'Nova Entrada'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Origem *</label>
            <input value={form.origin} onChange={(e) => setForm(f => ({ ...f, origin: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.origin ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.origin && <p className="text-red-500 text-xs mt-1">{errors.origin}</p>}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status Pagamento</label>
            <select value={form.paymentStatus} onChange={(e) => setForm(f => ({ ...f, paymentStatus: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="atrasado">Atrasado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data Pagamento</label>
            <input type="date" value={form.paymentDate} onChange={(e) => setForm(f => ({ ...f, paymentDate: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pagamento</label>
            <select value={form.paymentMethod} onChange={(e) => setForm(f => ({ ...f, paymentMethod: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Selecione...</option>
              <option value="PIX">PIX</option>
              <option value="Transferência">Transferência</option>
              <option value="Boleto">Boleto</option>
              <option value="Cartão">Cartão</option>
              <option value="Dinheiro">Dinheiro</option>
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
