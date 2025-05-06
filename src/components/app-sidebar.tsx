"use client"
import * as React from "react"
import { useState ,useEffect } from "react"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import axios from "axios"
import clsx from "clsx"



export function AppSidebar({ ...props}: React.ComponentProps<typeof Sidebar>) {
  const [chats, setChats] = useState<{ id: string; title: string }[]>([]);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const fetchChats = async () => {
    try {
        const res = await axios.get('/api/video');
        console.log(res.data);
        
        setChats(res.data);
    } catch (error) {
        alert("error fetching histroy")
    }
    };
    fetchChats();
  }, []);
  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-bold">History</h2>
        <Button size="sm" variant="ghost" onClick={()=>router.push('/dashboard/chat')}>
          <Plus className="w-4 h-4" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <ScrollArea className="h-full pr-2">
          {chats.map((conv) => {
            const href = `/dashboard/chat/${conv.id}`;
            const isActive = pathname === href;
            return(
            <Link
              key={conv.id}
              href={`/dashboard/chat/${conv.id}`}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">{conv.title}</span>
            </Link>
          )})}
        </ScrollArea>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}