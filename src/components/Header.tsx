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
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
];

const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸', timezone: 'America/New_York', currency: 'USD' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London', currency: 'GBP' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin', currency: 'EUR' },
  { code: 'FR', name: 'France', flag: '🇫🇷', timezone: 'Europe/Paris', currency: 'EUR' },
  { code: 'CN', name: 'China', flag: '🇨🇳', timezone: 'Asia/Shanghai', currency: 'CNY' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo', currency: 'JPY' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', timezone: 'Asia/Seoul', currency: 'KRW' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', timezone: 'Asia/Riyadh', currency: 'SAR' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', timezone: 'Asia/Dubai', currency: 'AED' },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'cn', name: '中文', flag: '🇨🇳', nativeName: '中文' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳', nativeName: 'हिंदी' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'jp', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
];

// Auto-detect user's location and preferences
const detectUserLocation = async () => {
  try {
    // Try to get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Try to get user's locale
    const locale = navigator.language || 'en-US';
    const [langCode, countryCode] = locale.split('-');
    
    // Find matching country
    const country = countries.find(c => 
      c.code === countryCode?.toUpperCase() || 
      c.timezone === timezone
    ) || countries[0]; // fallback to US
    
    // Find matching language
    const language = languages.find(l => l.code === langCode) || languages[0];
    
    return {
      country: country.code,
      timezone,
      currency: country.currency,
      language: language.code
    };
  } catch (error) {
    console.error('Error detecting user location:', error);
    return {
      country: 'US',
      timezone: 'America/New_York',
      currency: 'USD',
      language: 'en'
    };
  }
};

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
      const detected = await detectUserLocation();
      setSelectedCountry(detected.country);
      setSelectedCurrency(detected.currency);
      setUserTimezone(detected.timezone);
      if (detected.language !== language) {
        setLanguage(detected.language as 'en' | 'ar');
      }
    };
    
    detectAndSetPreferences();
  }, [language, setLanguage]);

  // Update time and date based on user's timezone
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      try {
        // Format time based on user's timezone
        const timeOptions: Intl.DateTimeFormatOptions = {
          timeZone: userTimezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        };
        
        // Format date based on user's timezone and language
        const dateOptions: Intl.DateTimeFormatOptions = {
          timeZone: userTimezone,
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        };
        
        const locale = language === 'ar' ? 'ar-SA' : 
                      language === 'en' ? 'en-US' :
                      `${language}-${selectedCountry}`;
        
        setCurrentTime(now.toLocaleTimeString(locale, timeOptions));
        setCurrentDate(now.toLocaleDateString(locale, dateOptions));
      } catch (error) {
        // Fallback to simple formatting
        setCurrentTime(now.toLocaleTimeString());
        setCurrentDate(now.toLocaleDateString());
      }
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [userTimezone, language, selectedCountry]);

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
           'User';
  };

  // Helper function to get user initial
  const getUserInitial = () => {
    const displayName = getUserDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">GPO Smart Platform</h1>
            </div>
          </div>

          {/* Central Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Current Date and Time */}
            <div className="flex items-center space-x-3 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{currentTime}</span>
              </div>
            </div>

            {/* Country Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedCountryData?.flag} {selectedCountryData?.code}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
                {countries.map((country) => (
                  <DropdownMenuItem
                    key={country.code}
                    onClick={() => handleCountryChange(country.code)}
                  >
                    {country.flag} {country.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {selectedCurrencyData?.symbol} {selectedCurrency}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-64 overflow-y-auto">
                {currencies.map((currency) => (
                  <DropdownMenuItem
                    key={currency.code}
                    onClick={() => setSelectedCurrency(currency.code)}
                  >
                    {currency.symbol} {currency.code} - {currency.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Globe className="h-4 w-4 mr-1" />
                  {selectedLanguageData?.flag} {selectedLanguageData?.nativeName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'en' | 'ar')}
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
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                3
              </Badge>
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitial()}
                    </div>
                    <span className="hidden md:inline">{getUserDisplayName()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">Login</Button>
                <Button size="sm">Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
