'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'

interface Equipment {
  id: string
  name: string
  brand: string
  model: string
  serialNumber: string
  category: string
  purchaseDate: string
  purchaseValue: string
  status: string
  location: string
  responsible: string
}

const initial: Equipment[] = [
  { id: '1', name: 'Câmera Sony A7 IV', brand: 'Sony', model: 'A7 IV', serialNumber: 'SN001234', category: 'Câmeras', purchaseDate: '2024-02-10', purchaseValue: 'R$ 18.000', status: 'disponível', location: 'Estúdio Principal', responsible: 'Pedro Costa' },
  { id: '2', name: 'DJI Mavic 3 Pro', brand: 'DJI', model: 'Mavic 3 Pro', serialNumber: 'DJI005678', category: 'Drones', purchaseDate: '2024-08-15', purchaseValue: 'R$ 12.000', status: 'disponível', location: 'Almoxarifado', responsible: 'Joselito' },
  { id: '3', name: 'Rode VideoMic Pro+', brand: 'Rode', model: 'VideoMic Pro+', serialNumber: 'RD009012', category: 'Áudio', purchaseDate: '2023-11-20', purchaseValue: 'R$ 2.500', status: 'disponível', location: 'Estúdio Principal', responsible: 'Maria Silva' },
  { id: '4', name: 'Godox SL-150W', brand: 'Godox', model: 'SL-150W', serialNumber: 'GD003456', category: 'Iluminação', purchaseDate: '2024-01-05', purchaseValue: 'R$ 1.800', status: 'manutenção', location: 'Oficina', responsible: '' },
  { id: '5', name: 'MacBook Pro M3', brand: 'Apple', model: 'MacBook Pro M3', serialNumber: 'AP007890', category: 'Computadores', purchaseDate: '2024-09-01', purchaseValue: 'R$ 22.000', status: 'disponível', location: 'Sala de Edição', responsible: 'Ana Oliveira' },
]

const empty: Equipment = { id: '', name: '', brand: '', model: '', serialNumber: '', category: 'Câmeras', purchaseDate: '', purchaseValue: '', status: 'disponível', location: '', responsible: '' }
const categories = ['Câmeras', 'Drones', 'Áudio', 'Iluminação', 'Computadores', 'Acessórios', 'Outros']

export default function EquipamentosPage() {
  const [equipment, setEquipment] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Equipment | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (e: Equipment) => { setEditing(e); setForm(e); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Nome é obrigatório'
    if (!form.category.trim()) errs.category = 'Categoria é obrigatória'
    if (!form.purchaseDate) errs.purchaseDate = 'Data de compra é obrigatória'
    if (!form.purchaseValue.trim()) errs.purchaseValue = 'Valor de compra é obrigatório'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setEquipment(prev => prev.map(e => e.id === editing.id ? { ...form, id: editing.id } : e))
    } else {
      setEquipment(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir este equipamento?')) setEquipment(prev => prev.filter(e => e.id !== id))
  }

  const inp = (label: string, key: keyof Equipment, type = 'text', required = false) => (
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
          <Plus className="w-4 h-4" /> Novo Equipamento
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Nome', 'Marca', 'Modelo', 'Categoria', 'Valor Compra', 'Status', 'Localização', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipment.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.name}</td>
                  <td className="px-4 py-3 text-gray-600">{e.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{e.model}</td>
                  <td className="px-4 py-3 text-gray-600">{e.category}</td>
                  <td className="px-4 py-3 text-gray-600">{e.purchaseValue}</td>
                  <td className="px-4 py-3"><StatusBadge status={e.status} /></td>
                  <td className="px-4 py-3 text-gray-600">{e.location || '—'}</td>
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

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Equipamento' : 'Novo Equipamento'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">{inp('Nome', 'name', 'text', true)}</div>
          {inp('Marca', 'brand')}
          {inp('Modelo', 'model')}
          {inp('Nº de Série', 'serialNumber')}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {inp('Data de Compra', 'purchaseDate', 'date', true)}
          {inp('Valor de Compra', 'purchaseValue', 'text', true)}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="disponível">Disponível</option>
              <option value="indisponível">Indisponível</option>
              <option value="manutenção">Manutenção</option>
            </select>
          </div>
          {inp('Localização', 'location')}
          {inp('Responsável', 'responsible')}
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={() => setModal(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Cancelar</button>
          <button onClick={save} className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800">{editing ? 'Salvar' : 'Criar'}</button>
        </div>
      </Modal>
    </div>
  )
}
