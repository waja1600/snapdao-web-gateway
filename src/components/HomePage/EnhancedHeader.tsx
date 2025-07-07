
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, MapPin, DollarSign, Clock, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export const EnhancedHeader = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedCurrency, setCurrency] = useState('USD');

  // Languages with flags
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
    { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', nativeName: 'हिंदी' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', nativeName: '한국어' }
  ];

  // Countries with currencies
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'ر.س' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪', currency: 'AED', symbol: 'د.إ' },
    { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€' },
    { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', symbol: '¥' },
    { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', symbol: '₩' }
  ];

  const selectedCountryData = countries.find(c => c.code === selectedCountry);
  const selectedLanguageData = languages.find(l => l.code === language);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      
      const locale = language === 'ar' ? 'ar-SA' : 'en-US';
      setCurrentTime(now.toLocaleTimeString(locale, timeOptions));
      setCurrentDate(now.toLocaleDateString(locale, dateOptions));
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(countryCode);
      setCurrency(country.currency);
    }
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">GPO</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">GPO WORLD</h1>
                <p className="text-xs text-muted-foreground">Smart Business Platform</p>
              </div>
            </div>
          </div>

          {/* Center Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Date and Time */}
            <div className="flex items-center space-x-3 text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{currentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-dao-green" />
                <span className="font-mono font-medium">{currentTime}</span>
              </div>
            </div>

            {/* Country Selector */}
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className="w-[140px]">
                <MapPin className="h-4 w-4 mr-1" />
                {selectedCountryData?.flag} {selectedCountryData?.code}
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Currency Display */}
            <div className="flex items-center space-x-2 text-sm bg-muted px-3 py-2 rounded-lg border">
              <DollarSign className="h-4 w-4 text-dao-green" />
              <span className="font-medium">{selectedCountryData?.symbol} {selectedCountryData?.currency}</span>
            </div>

            {/* Language Selector */}
            <Select value={language} onValueChange={(value: 'en' | 'ar') => setLanguage(value)}>
              <SelectTrigger className="w-[140px]">
                <Globe className="h-4 w-4 mr-1" />
                {selectedLanguageData?.flag} {selectedLanguageData?.nativeName}
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Navigation and Auth */}
          <div className="flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
                    href="/about"
                  >
                    {language === 'en' ? 'About Us' : 'من نحن'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
                    href="/how-it-works"
                  >
                    {language === 'en' ? 'How It Works' : 'كيف تعمل'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" 
                    href="/contact"
                  >
                    {language === 'en' ? 'Support' : 'الدعم'}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                {language === 'en' ? 'Login' : 'تسجيل الدخول'}
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                className="gradient-primary shadow-md hover:shadow-lg transition-all duration-300"
              >
                {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
