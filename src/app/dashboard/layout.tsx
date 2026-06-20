import { DashboardSidebar } from "@/components/dashboardComponents/DashboardSidebar"
import { Toast } from "@heroui/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div >
  <div className="flex gap-2 min-h-screen">
  <div>

      <DashboardSidebar></DashboardSidebar>
  </div>
    <div className="flex-1 p-6">
      <section >{children}
        <Toast.Provider />
      </section>
    </div>
  </div>
  </div>
  
}