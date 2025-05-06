import * as React from "react"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { MessageSquare, Plus } from "lucide-react"
import { Button } from "./ui/button"

const history = [
  { id: "1", title: "How to use Next.js routing?", isActive: false },
  { id: "2", title: "Fix hydration error", isActive: true },
  { id: "3", title: "Deploy with Vercel", isActive: false },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">History</h2>
        <Button size="sm" variant="ghost">
          <Plus className="w-4 h-4" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <ScrollArea className="h-full pr-2">
          {history.map((conv) => (
            <button
              key={conv.id}
              className={
                `w-full flex items-center gap-2 p-3 rounded-md text-sm hover:bg-muted transition",
                ${conv.isActive ? "bg-muted font-semibold" : "text-muted-foreground"}`
              }
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">{conv.title}</span>
            </button>
          ))}
        </ScrollArea>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}