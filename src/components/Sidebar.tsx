
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Code, 
  PieChart, 
  FileText, 
  LayoutDashboard,
  Workflow,
  FileCode,
  Server
} from 'lucide-react';
import { 
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Project Workspace', path: '/dashboard/projects', icon: Workflow },
    { name: 'Prompt Summary', path: '/dashboard/prompts', icon: MessageSquare },
    { name: 'Infrastructure Code', path: '/dashboard/infra', icon: Code },
    { name: 'Architecture Diagram', path: '/dashboard/architecture', icon: Server },
    { name: 'FinOps Report', path: '/dashboard/finops', icon: PieChart },
    { name: 'Documentation', path: '/dashboard/docs', icon: FileText },
    { name: 'Deployment Logs', path: '/dashboard/logs', icon: FileCode }
  ];

  return (
    <SidebarComponent className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
      <SidebarContent className="p-0">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 pt-4">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path} 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                        currentPath === item.path ? 'bg-devopsgenie-primary text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
