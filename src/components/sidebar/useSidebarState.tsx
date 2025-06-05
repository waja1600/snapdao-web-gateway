
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useSidebarState = (language: string) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [userRole, setUserRole] = useState<string>('company');

  // Update time and date every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      setCurrentDate(now.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

  // Detect role from path
  useEffect(() => {
    const rolePaths = {
      '/freelancers': 'freelancer',
      '/suppliers': 'supplier',
      '/cooperative-buying': 'company',
      '/arbitration': 'supervisor'
    };
    
    for (const [path, role] of Object.entries(rolePaths)) {
      if (location.pathname.startsWith(path)) {
        setUserRole(role);
        break;
      }
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return {
    isCollapsed,
    currentTime,
    currentDate,
    userRole,
    toggleSidebar,
    setUserRole
  };
};
