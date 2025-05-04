
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  LayoutDashboard, 
  FileText, 
  Vote, 
  FolderKanban, 
  Users 
} from "lucide-react";

export function Sidebar() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t('dashboard'),
      path: '/dashboard'
    },
    {
      icon: FolderKanban,
      label: t('projects'),
      path: '/projects'
    },
    {
      icon: FileText,
      label: t('proposals'),
      path: '/proposals'
    },
    {
      icon: Vote,
      label: t('voting'),
      path: '/voting'
    },
    {
      icon: Users,
      label: t('members'),
      path: '/members'
    },
  ];
  
  return (
    <div className={cn(
      "h-screen bg-gray-100 w-64 py-4 flex flex-col border-r border-gray-200",
      language === 'ar' ? "border-l" : "border-r"
    )}>
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold">Collective</h1>
      </div>
      
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 w-full text-left hover:bg-gray-200 transition-colors",
                  isActive(item.path) ? "bg-gray-200" : "",
                  language === 'ar' ? "flex-row-reverse" : ""
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="px-6 mt-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/settings')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
