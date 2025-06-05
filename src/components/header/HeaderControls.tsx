
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Globe, Clock, DollarSign, MapPin, Calendar } from 'lucide-react';

interface HeaderControlsProps {
  currentDate: string;
  currentTime: string;
  currencies: Array<{ code: string; symbol: string; name: string; nameAr: string }>;
  countries: Array<{ code: string; name: string; nameAr: string; flag: string; timezone: string; currency: string }>;
  languages: Array<{ code: string; name: string; flag: string; nativeName: string }>;
  selectedCurrency: string;
  selectedCountry: string;
  language: string;
  onCurrencyChange: (currency: string) => void;
  onCountryChange: (country: string) => void;
  onLanguageChange: (language: 'en' | 'ar') => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  currentDate,
  currentTime,
  currencies,
  countries,
  languages,
  selectedCurrency,
  selectedCountry,
  language,
  onCurrencyChange,
  onCountryChange,
  onLanguageChange
}) => {
  const selectedCurrencyData = currencies.find(c => c.code === selectedCurrency);
  const selectedCountryData = countries.find(c => c.code === selectedCountry);
  const selectedLanguageData = languages.find(l => l.code === language);

  return (
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
              onClick={() => onCountryChange(country.code)}
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
              onClick={() => onCurrencyChange(currency.code)}
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
              onClick={() => onLanguageChange(lang.code as 'en' | 'ar')}
              className="font-medium"
            >
              {lang.flag} {lang.nativeName}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
