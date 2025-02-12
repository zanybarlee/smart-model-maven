
import { Menu, Home, FileJson, Settings, Info } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Domain Models",
    url: "/",
    icon: FileJson,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="p-4 border-b border-slate-200">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Domain Model Logo" 
          className="h-8 w-full object-contain"
        />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Domain Modeler</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
