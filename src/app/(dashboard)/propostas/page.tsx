'use client'

import { useState } from 'react'
import { Send, Sparkles, FileText, Plus } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'

interface Proposal {
  id: string
  title: string
  company: string
  value: string
  status: string
  date: string
}

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

const initialProposals: Proposal[] = [
  { id: '1', title: 'Proposta Cobertura Prefeitura 2026', company: 'Prefeitura Municipal', value: 'R$ 50.000', status: 'enviada', date: '2026-05-01' },
  { id: '2', title: 'Pacote Casamento Premium', company: '', value: 'R$ 8.500', status: 'aceita', date: '2026-05-10' },
  { id: '3', title: 'Proposta TV Sertão Q2', company: 'TV Sertão', value: 'R$ 25.000', status: 'rascunho', date: '2026-06-01' },
]

const aiResponses = [
  'Proposta gerada com sucesso! Incluí cláusulas de entrega, cronograma de pagamento e especificações técnicas.',
  'Baseado no perfil da empresa, recomendo incluir um pacote de revisões ilimitadas e entrega em 7 dias úteis.',
  'Proposta criada! Sugiro adicionar um bônus de "Making Of" para aumentar o valor percebido pelo cliente.',
  'Analisei contratos similares. O preço está competitivo para a região do Sertão baiano. Proposta pronta!',
]

export default function PropostasPage() {
  const [proposals, setProposals] = useState(initialProposals)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Olá! Sou a IA de propostas do SertãoGest Pro. Descreva o serviço, cliente e valor desejado e eu gero uma proposta profissional automaticamente.' }
  ])
  const [input, setInput] = useState('')
  const [selected, setSelected] = useState<Proposal | null>(null)

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)]
    }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setInput('')
  }

  const generateProposal = () => {
    const newProposal: Proposal = {
      id: Date.now().toString(),
      title: `Nova Proposta ${new Date().toLocaleDateString('pt-BR')}`,
      company: 'A definir',
      value: 'R$ 0,00',
      status: 'rascunho',
      date: new Date().toISOString().split('T')[0],
    }
    setProposals(prev => [newProposal, ...prev])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Proposals list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Propostas</h2>
          <button onClick={generateProposal} className="flex items-center gap-2 px-3 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
            <Plus className="w-4 h-4" /> Nova Proposta
          </button>
        </div>
        <div className="space-y-3">
          {proposals.map(p => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${selected?.id === p.id ? 'border-blue-500 shadow-md' : 'border-gray-100 hover:border-gray-300 shadow-sm'}`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-800 text-sm">{p.title}</span>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-between">
                <span>{p.company || 'Particular'}</span>
                <span className="font-semibold text-green-600">{p.value}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{p.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
        <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gradient-to-r from-blue-700 to-blue-600 rounded-t-xl">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="font-semibold text-white">Gerar Proposta com IA</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${msg.role === 'ai' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>
                {msg.role === 'ai' ? 'IA' : 'EU'}
              </div>
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'ai' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ex: Proposta para cobertura de casamento em Jacobina, R$ 5.000..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={sendMessage} className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
