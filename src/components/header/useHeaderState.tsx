
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

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

export const useHeaderState = () => {
  const { language, setLanguage } = useLanguage();
  
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

  const handleCountryChange = (countryCode: string) => {
    const country = countries.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(countryCode);
      setUserTimezone(country.timezone);
      setSelectedCurrency(country.currency);
    }
  };

  return {
    currencies,
    countries,
    languages,
    selectedCurrency,
    selectedCountry,
    currentTime,
    currentDate,
    language,
    setLanguage,
    setSelectedCurrency,
    handleCountryChange
  };
};
