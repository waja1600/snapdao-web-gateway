
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';

interface UserMenuProps {
  language: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ language }) => {
  const { user, logout } = useAuth();

  // Helper function to get user display name
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || 
           user.email?.split('@')[0] || 
           (language === 'ar' ? 'مستخدم' : 'User');
  };

  // Helper function to get user initial
  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  if (!user) {
    return (
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm" className="font-medium">
          {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
        </Button>
        <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700">
          {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 h-10">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
            {getUserInitial()}
          </div>
          <span className="hidden md:inline font-medium">{getUserDisplayName()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem className="font-medium">
          <User className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="font-medium">
          {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
