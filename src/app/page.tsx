'use client'

import Link from 'next/link'
import { Zap, Video, FileText, DollarSign, Users, Camera, BarChart2, CheckCircle, Star } from 'lucide-react'

const features = [
  { icon: FileText, title: 'Gestão de Contratos', description: 'Gerencie todos os seus contratos com clientes em um só lugar. Alertas de vencimento automáticos.' },
  { icon: Video, title: 'Portfólio de Vídeos', description: 'Organize e categorize todos os seus projetos audiovisuais com facilidade.' },
  { icon: DollarSign, title: 'Controle Financeiro', description: 'Acompanhe entradas, saídas e lucros em tempo real com relatórios completos.' },
  { icon: Users, title: 'Gestão de Equipe', description: 'Controle funcionários, cargos, salários e departamentos.' },
  { icon: Camera, title: 'Inventário de Equipamentos', description: 'Saiba onde está cada equipamento, seu estado e valor patrimonial.' },
  { icon: BarChart2, title: 'Relatórios IA', description: 'Relatórios inteligentes e propostas geradas por IA para impulsionar seu negócio.' },
]

const plans = [
  {
    name: 'Básico',
    price: 'R$ 97',
    period: '/mês',
    description: 'Para freelancers e pequenos produtores',
    features: ['Até 50 contratos', 'Gestão financeira básica', '5 usuários', 'Suporte por email'],
    cta: 'Começar Grátis',
    highlighted: false,
  },
  {
    name: 'Profissional',
    price: 'R$ 197',
    period: '/mês',
    description: 'Para produtoras em crescimento',
    features: ['Contratos ilimitados', 'IA para propostas', 'Até 20 usuários', 'Suporte prioritário', 'Relatórios avançados'],
    cta: 'Assinar Agora',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'R$ 497',
    period: '/mês',
    description: 'Para grandes produtoras',
    features: ['Tudo do Profissional', 'Usuários ilimitados', 'API personalizada', 'Treinamento dedicado', 'SLA garantido'],
    cta: 'Falar com Vendas',
    highlighted: false,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-800">SERTÃO GEST PRO</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800 font-medium">Entrar</Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">Começar Grátis</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800 text-blue-200 px-4 py-2 rounded-full text-sm mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>O sistema #1 para produtoras de vídeo do Nordeste</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Gerencie sua Produtora<br />
            <span style={{ color: '#FF8C00' }}>de Forma Profissional</span>
          </h1>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            O SertãoGest Pro é o sistema completo para empresas de audiovisual.
            Contratos, finanças, equipamentos e equipe — tudo em um único lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-8 py-3.5 rounded-xl font-semibold text-white text-base transition-colors"
              style={{ backgroundColor: '#FF8C00' }}>
              Começar Grátis — 14 dias
            </Link>
            <Link href="/dashboard" className="px-8 py-3.5 rounded-xl font-semibold text-white text-base border border-slate-500 hover:bg-slate-700 transition-colors">
              Ver Demo
            </Link>
          </div>
          <p className="text-slate-400 text-sm mt-4">Sem cartão de crédito • Cancele quando quiser</p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Tudo que sua produtora precisa</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Do contrato à entrega, gerencie todo o ciclo do seu negócio audiovisual</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Planos e Preços</h2>
            <p className="text-gray-500">Escolha o plano ideal para o tamanho da sua operação</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlighted ? 'bg-blue-700 text-white shadow-xl scale-105' : 'bg-white border border-gray-200 text-gray-800'}`}>
                <p className={`text-sm font-semibold mb-1 ${plan.highlighted ? 'text-blue-200' : 'text-blue-600'}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm mb-1 ${plan.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-blue-200' : 'text-gray-500'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-blue-300' : 'text-green-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/signup"
                  className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.highlighted ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-blue-700 text-white hover:bg-blue-800'}`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-700 to-blue-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para transformar sua produtora?</h2>
          <p className="text-blue-200 mb-8">Junte-se a centenas de produtoras que já usam o SertãoGest Pro</p>
          <Link href="/signup" className="px-8 py-4 bg-white text-blue-700 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors">
            Começar Agora — Grátis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-slate-400 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-white font-bold">SERTÃO GEST PRO</span>
        </div>
        <p>© 2026 SertãoGest Pro. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
