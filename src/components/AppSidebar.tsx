
import { Menu, Home, FileJson, Settings, Info, Code, TestTube, Cloud, Activity, Database, Layout } from "lucide-react";
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
    title: "Domain Modeler",
    url: "/domain",
    icon: Database,
    description: "AI-powered domain modeling"
  },
  {
    title: "Design & Planning",
    url: "/design",
    icon: Layout,
    description: "AI-assisted requirements and architecture"
  },
  {
    title: "Code Generation",
    url: "/code",
    icon: Code,
    description: "AI-powered coding and optimization"
  },
  {
    title: "Testing",
    url: "/testing",
    icon: TestTube,
    description: "Automated testing and quality assurance"
  },
  {
    title: "Deployment",
    url: "/deployment",
    icon: Cloud,
    description: "CI/CD and deployment strategies"
  },
  {
    title: "Monitoring",
    url: "/monitoring",
    icon: Activity,
    description: "System monitoring and maintenance"
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
          src="/lovable-uploads/506339ad-e7b0-469a-9cb1-db8f65f28bfc.png"
          alt="CENS Logo" 
          className="h-8 w-full object-contain"
        />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GenAI Application Life Cycle</SidebarGroupLabel>
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
