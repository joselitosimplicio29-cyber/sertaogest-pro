'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

const mockResponses = [
  'Com base nos seus dados, recomendo focar em contratos de longo prazo com a Prefeitura Municipal.',
  'Para otimizar seus serviços de vídeo, considere criar pacotes especiais para eventos corporativos.',
  'Analisando seu fluxo financeiro, seus meses mais fortes são março e junho.',
  'Recomendo investir em equipamentos de drone para ampliar seus serviços de cobertura aérea.',
  'Sua equipe está com boa capacidade. Considere contratar um editor adicional para atender a demanda crescente.',
  'Com base nos seus eventos, o período de festas juninas é o mais lucrativo para a região do Sertão.',
]

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Olá! Sou o assistente IA do SertãoGest Pro. Como posso ajudar você a gerenciar seu negócio de audiovisual hoje?' }
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      content: mockResponses[Math.floor(Math.random() * mockResponses.length)]
    }
    setMessages(prev => [...prev, userMsg, aiMsg])
    setInput('')
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-700 text-white shadow-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col h-96">
          <div className="bg-blue-700 text-white px-4 py-3 rounded-t-xl flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <span className="font-semibold text-sm">Assistente IA</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {msg.role === 'ai' ? <Bot className="w-4 h-4 text-blue-600" /> : <User className="w-4 h-4 text-gray-600" />}
                </div>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${msg.role === 'ai' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
