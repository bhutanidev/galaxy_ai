import AlreadyUploaded from "@/components/alreadyUploaded"
import { AppSidebar } from "@/components/app-sidebar"
import VideoUploadForm from "@/components/formUpload"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div className="flex  flex-col items-center p-4">
          {/* <VideoUploadForm/> */}
          {/* <AlreadyUploaded id="681a4c60238eaf8146089c62"/> */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
