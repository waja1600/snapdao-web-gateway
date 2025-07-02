
import { useAuth } from "@/contexts/AuthContext";

export const useSidebarUser = (userRole: string, language: string) => {
  const { user, signOut } = useAuth();

  // Helper to get the role display name
  const getRoleDisplayName = () => {
    switch(userRole) {
      case 'company': return language === 'ar' ? 'شركة' : 'Company';
      case 'freelancer': return language === 'ar' ? 'مستقل' : 'Freelancer';
      case 'supplier': return language === 'ar' ? 'مورد' : 'Supplier';
      case 'supervisor': return language === 'ar' ? 'مشرف' : 'Supervisor';
      default: return '';
    }
  };

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

  // Helper function to get user email
  const getUserEmail = () => {
    return user?.email || '';
  };

  return {
    user,
    logout: signOut, // Provide logout as an alias for signOut for backward compatibility
    getRoleDisplayName,
    getUserDisplayName,
    getUserInitial,
    getUserEmail
  };
};
