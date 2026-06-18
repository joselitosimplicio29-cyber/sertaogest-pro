'use client'

import { useState } from 'react'
import { Save, Bell, Lock, Building2, User } from 'lucide-react'

export default function ConfiguracoesPage() {
  const [tab, setTab] = useState<'perfil' | 'empresa' | 'notificacoes' | 'seguranca'>('perfil')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { key: 'perfil', label: 'Perfil', icon: User },
    { key: 'empresa', label: 'Empresa', icon: Building2 },
    { key: 'notificacoes', label: 'Notificações', icon: Bell },
    { key: 'seguranca', label: 'Segurança', icon: Lock },
  ] as const

  const [notifs, setNotifs] = useState({
    emailContratos: true,
    emailEventos: true,
    emailFinanceiro: false,
    pushEventos: true,
    pushFinanceiro: true,
    pushFuncionarios: false,
  })

  return (
    <div className="max-w-3xl space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit flex-wrap">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === key ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {tab === 'perfil' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800 text-base">Dados do Perfil</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">JL</div>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Alterar Foto</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['Nome Completo', 'Joselito Simplício'], ['Email', 'joselitosimplicio29@gmail.com'], ['Telefone', '(74) 99000-0000'], ['Cargo', 'Administrador']].map(([label, val]) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'empresa' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800 text-base">Dados da Empresa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Nome da Empresa', 'SertãoGest Produções'],
                ['CNPJ', '12.345.678/0001-99'],
                ['Endereço', 'Rua das Orquídeas, 123 - Jacobina - BA'],
                ['Telefone Comercial', '(74) 3000-0000'],
                ['Site', 'www.sertaogest.com.br'],
                ['Banco', 'Banco do Brasil'],
              ].map(([label, val]) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input defaultValue={val} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo da Empresa</label>
                <input type="file" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {tab === 'notificacoes' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800 text-base">Preferências de Notificação</h2>
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-600">Email</p>
              {[
                ['emailContratos', 'Novos contratos e atualizações'],
                ['emailEventos', 'Lembretes de eventos'],
                ['emailFinanceiro', 'Relatórios financeiros'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-700">{label}</span>
                  <button
                    onClick={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                    className={`w-11 h-6 rounded-full transition-colors ${notifs[key as keyof typeof notifs] ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${notifs[key as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
              <p className="text-sm font-medium text-gray-600 mt-4">Push</p>
              {[
                ['pushEventos', 'Eventos próximos'],
                ['pushFinanceiro', 'Pagamentos recebidos'],
                ['pushFuncionarios', 'Ponto dos funcionários'],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-700">{label}</span>
                  <button
                    onClick={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                    className={`w-11 h-6 rounded-full transition-colors ${notifs[key as keyof typeof notifs] ? 'bg-blue-600' : 'bg-gray-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${notifs[key as keyof typeof notifs] ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'seguranca' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-800 text-base">Alterar Senha</h2>
            <div className="space-y-4 max-w-sm">
              {['Senha Atual', 'Nova Senha', 'Confirmar Nova Senha'].map(label => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
            <Save className="w-4 h-4" /> Salvar Alterações
          </button>
          {saved && <span className="text-green-600 text-sm font-medium">Salvo com sucesso!</span>}
        </div>
      </div>
    </div>
  )
}
