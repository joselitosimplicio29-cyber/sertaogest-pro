'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Play } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'
import Modal from '@/components/ui/Modal'

interface VideoItem {
  id: string
  title: string
  company: string
  date: string
  type: string
  url: string
  description: string
  status: string
}

const initial: VideoItem[] = [
  { id: '1', title: 'Inauguração da Praça Central', company: 'Prefeitura Municipal', date: '2026-03-15', type: 'institucional', url: 'https://youtube.com/watch?v=xxx', description: 'Cobertura completa da inauguração', status: 'publicado' },
  { id: '2', title: 'Festival de Forró 2026', company: 'Eventos Bahia', date: '2026-06-24', type: 'evento', url: '', description: 'Captação do maior festival do Sertão', status: 'rascunho' },
  { id: '3', title: 'Campanha TV Sertão', company: 'TV Sertão', date: '2026-04-01', type: 'publicitário', url: 'https://youtube.com/watch?v=yyy', description: 'Campanha comercial para TV regional', status: 'publicado' },
  { id: '4', title: 'Documentário Sertão', company: '', date: '2026-05-10', type: 'documentário', url: '', description: 'Documentário sobre a cultura sertaneja', status: 'pendente' },
]

const empty: VideoItem = { id: '', title: '', company: '', date: '', type: 'institucional', url: '', description: '', status: 'rascunho' }
const types = ['institucional', 'evento', 'publicitário', 'documentário']
const typeColors: Record<string, string> = {
  institucional: 'bg-blue-100 text-blue-800',
  evento: 'bg-purple-100 text-purple-800',
  'publicitário': 'bg-orange-100 text-orange-800',
  'documentário': 'bg-gray-100 text-gray-800',
}

export default function VideosPage() {
  const [videos, setVideos] = useState(initial)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<VideoItem | null>(null)
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const openNew = () => { setEditing(null); setForm(empty); setErrors({}); setModal(true) }
  const openEdit = (v: VideoItem) => { setEditing(v); setForm(v); setErrors({}); setModal(true) }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = 'Título é obrigatório'
    if (!form.date) errs.date = 'Data é obrigatória'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const save = () => {
    if (!validate()) return
    if (editing) {
      setVideos(prev => prev.map(v => v.id === editing.id ? { ...form, id: editing.id } : v))
    } else {
      setVideos(prev => [...prev, { ...form, id: Date.now().toString() }])
    }
    setModal(false)
  }

  const remove = (id: string) => {
    if (confirm('Excluir este vídeo?')) setVideos(prev => prev.filter(v => v.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
          <Plus className="w-4 h-4" /> Novo Vídeo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(v => (
          <div key={v.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 h-36 flex items-center justify-center">
              <Play className="w-10 h-10 text-white opacity-60" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-800 text-sm leading-tight">{v.title}</h3>
                <StatusBadge status={v.status} />
              </div>
              <p className="text-xs text-gray-500 mb-1">{v.company || '—'}</p>
              <p className="text-xs text-gray-400 mb-3">{v.date}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[v.type] || 'bg-gray-100 text-gray-700'}`}>{v.type}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(v)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(v.id)} className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Editar Vídeo' : 'Novo Vídeo'}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
            <input value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Realização *</label>
            <input type="date" value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))}
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.date ? 'border-red-500' : 'border-gray-200'}`} />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="rascunho">Rascunho</option>
              <option value="pendente">Pendente</option>
              <option value="publicado">Publicado</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo</label>
            <input value={form.url} onChange={(e) => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
