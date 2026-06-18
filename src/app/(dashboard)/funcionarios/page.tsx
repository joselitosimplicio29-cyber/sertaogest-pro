'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'

interface Employee {
  id: string
  name: string
  cpf: string
  email: string
  phone: string
  role: string
  department: string
  salary: string
  hireDate: string
  status: string
}

const initial: Employee[] = [
  { id: '1', name: 'Maria Silva Santos', cpf: '111.111.111-11', email: 'maria@sertaogest.com', phone: '(74) 99111-1111', role: 'Editora', department: 'Produção', salary: 'R$ 3.500', hireDate: '2024-01-15', status: 'ativo' },
  { id: '2', name: 'Pedro Costa Lima', cpf: '222.222.222-22', email: 'pedro@sertaogest.com', phone: '(74) 99222-2222', role: 'Cinegrafista', department: 'Produção', salary: 'R$ 4.000', hireDate: '2023-06-01', status: 'ativo' },
  { id: '3', name: 'Ana Oliveira Souza', cpf: '333.333.333-33', email: 'ana@sertaogest.com', phone: '(74) 99333-3333', role: 'Designer', department: 'Criação', salary: 'R$ 3.000', hireDate: '2024-03-10', status: 'ativo' },
  { id: '4', name: 'Carlos Fernandes', cpf: '444.444.444-44', email: 'carlos@sertaogest.com', phone: '(74) 99444-4444', role: 'Assistente', department: 'Produção', salary: 'R$ 2.200', hireDate: '2025-01-05', status: 'inativo' },
]

const empty: Employee = { id: '', name: '', cpf: '', email: '', phone: '', role: '', department: '', salary: '', hireDate: '', status: 'ativo' }

export default function FuncionariosPage() {
  const [employees, setEmployees] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Employee | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (e: Employee) => { setEditing(e); setForm(e); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Nome é obrigatório'
    if (!form.cpf.trim()) errs.cpf = 'CPF é obrigatório'
    if (!form.role.trim()) errs.role = 'Cargo é obrigatório'
    if (!form.department.trim()) errs.department = 'Departamento é obrigatório'
    if (!form.salary.trim()) errs.salary = 'Salário é obrigatório'
    if (!form.hireDate) errs.hireDate = 'Data de admissão é obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setEmployees(prev => prev.map(e => e.id === editing.id ? { ...form, id: editing.id } : e))
    } else {
      setEmployees(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir este funcionário?')) setEmployees(prev => prev.filter(e => e.id !== id))
  }

  const inp = (label: string, key: keyof Employee, type = 'text', required = false) => (
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
          <Plus className="w-4 h-4" /> Novo Funcionário
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Nome', 'CPF', 'Cargo', 'Departamento', 'Salário', 'Admissão', 'Status', 'Ações'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{e.name}</td>
                  <td className="px-4 py-3 text-gray-600">{e.cpf}</td>
                  <td className="px-4 py-3 text-gray-600">{e.role}</td>
                  <td className="px-4 py-3 text-gray-600">{e.department}</td>
                  <td className="px-4 py-3 text-gray-600">{e.salary}</td>
                  <td className="px-4 py-3 text-gray-600">{e.hireDate}</td>
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

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Funcionário' : 'Novo Funcionário'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inp('Nome', 'name', 'text', true)}
          {inp('CPF', 'cpf', 'text', true)}
          {inp('Email', 'email', 'email')}
          {inp('Telefone', 'phone')}
          {inp('Cargo', 'role', 'text', true)}
          {inp('Departamento', 'department', 'text', true)}
          {inp('Salário', 'salary', 'text', true)}
          {inp('Data de Admissão', 'hireDate', 'date', true)}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ativo">Ativo</option>
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
