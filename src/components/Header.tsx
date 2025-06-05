
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Globe, Clock, DollarSign, MapPin, User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', nameAr: 'دولار أمريكي' },
  { code: 'EUR', symbol: '€', name: 'Euro', nameAr: 'يورو' },
  { code: 'GBP', symbol: '£', name: 'British Pound', nameAr: 'جنيه إسترليني' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', nameAr: 'ين ياباني' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', nameAr: 'يوان صيني' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', nameAr: 'ريال سعودي' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', nameAr: 'درهم إماراتي' },
];

const countries = [
  { code: 'US', name: 'United States', nameAr: 'الولايات المتحدة', flag: '🇺🇸', timezone: 'America/New_York', currency: 'USD' },
  { code: 'UK', name: 'United Kingdom', nameAr: 'المملكة المتحدة', flag: '🇬🇧', timezone: 'Europe/London', currency: 'GBP' },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا', flag: '🇩🇪', timezone: 'Europe/Berlin', currency: 'EUR' },
  { code: 'FR', name: 'France', nameAr: 'فرنسا', flag: '🇫🇷', timezone: 'Europe/Paris', currency: 'EUR' },
  { code: 'CN', name: 'China', nameAr: 'الصين', flag: '🇨🇳', timezone: 'Asia/Shanghai', currency: 'CNY' },
  { code: 'JP', name: 'Japan', nameAr: 'اليابان', flag: '🇯🇵', timezone: 'Asia/Tokyo', currency: 'JPY' },
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', flag: '🇸🇦', timezone: 'Asia/Riyadh', currency: 'SAR' },
  { code: 'AE', name: 'UAE', nameAr: 'الإمارات', flag: '🇦🇪', timezone: 'Asia/Dubai', currency: 'AED' },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
];

export const Header = () => {
  const { language, setLanguage } = useLanguage();
  const { user, logout } = useAuth();
  
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [userTimezone, setUserTimezone] = useState('America/New_York');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // Auto-detect user preferences on mount
  useEffect(() => {
    const detectAndSetPreferences = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language || 'en-US';
        const [langCode, countryCode] = locale.split('-');
        
        const country = countries.find(c => 
          c.code === countryCode?.toUpperCase() || 
          c.timezone === timezone
        ) || countries[0];
        
        setSelectedCountry(country.code);
        setSelectedCurrency(country.currency);
        setUserTimezone(country.timezone);
      } catch (error) {
        console.error('Error detecting user location:', error);
      }
    };
    
    detectAndSetPreferences();
  }, []);

  // Update time and date based on user's timezone
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      try {
        const timeOptions: Intl.DateTimeFormatOptions = {
          timeZone: userTimezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        
        const dateOptions: Intl.DateTimeFormatOptions = {
          timeZone: userTimezone,
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };
        
        const locale = language === 'ar' ? 'ar-SA' : 'en-US';
        
        setCurrentTime(now.toLocaleTimeString(locale, timeOptions));
        setCurrentDate(now.toLocaleDateString(locale, dateOptions));
      } catch (error) {
        setCurrentTime(now.toLocaleTimeString());
        setCurrentDate(now.toLocaleDateString());
      }
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [userTimezone, language]);

  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
  const selectedCountryData = countries.find(c => c.code === selectedCountry);
  const selectedLanguageData = languages.find(l => l.code === language);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(countryCode);
      setUserTimezone(country.timezone);
      setSelectedCurrency(country.currency);
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

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">
                {language === 'ar' ? 'منصة GPO الذكية' : 'GPO Smart Platform'}
              </h1>
            </div>
          </div>

          {/* Central Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Current Date and Time */}
            <div className="flex items-center space-x-3 text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-mono font-medium">{currentTime}</span>
              </div>
            </div>

            {/* Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 font-medium">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedCountryData?.flag} {selectedCountryData?.code}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto bg-white">
                {countries.map((country) => (
                  <DropdownMenuItem
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                    className="font-medium"
                  >
                    {country.flag} {language === 'ar' ? country.nameAr : country.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 font-medium">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {selectedCurrencyData?.symbol} {selectedCurrency}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto bg-white">
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.code)}
                    className="font-medium"
                  >
                    {currency.symbol} {currency.code} - {language === 'ar' ? currency.nameAr : currency.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 font-medium">
                  <Globe className="h-4 w-4 mr-1" />
                  {selectedLanguageData?.flag} {selectedLanguageData?.nativeName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'en' | 'ar')}
                    className="font-medium"
                  >
                    {lang.flag} {lang.nativeName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative h-10 w-10">
              <Bell className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
                variant="destructive"
              >
                3
              </Badge>
            </Button>

            {/* User Menu */}
            {user ? (
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
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="font-medium">
                  {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Button>
                <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700">
                  {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
