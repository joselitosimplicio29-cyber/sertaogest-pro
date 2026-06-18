import DashboardLayout from '@/components/layout/DashboardLayout'
import AIChat from '@/components/AIChat'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
      <AIChat />
    </DashboardLayout>
  )
}
