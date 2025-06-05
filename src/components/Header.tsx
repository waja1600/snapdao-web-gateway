
import React from 'react';
import { useHeaderState } from './header/useHeaderState';
import { HeaderControls } from './header/HeaderControls';
import { NotificationButton } from './header/NotificationButton';
import { UserMenu } from './header/UserMenu';

export const Header = () => {
  const {
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
  } = useHeaderState();

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
          <HeaderControls
            currentDate={currentDate}
            currentTime={currentTime}
            currencies={currencies}
            countries={countries}
            languages={languages}
            selectedCurrency={selectedCurrency}
            selectedCountry={selectedCountry}
            language={language}
            onCurrencyChange={setSelectedCurrency}
            onCountryChange={handleCountryChange}
            onLanguageChange={setLanguage}
          />

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <NotificationButton />
            <UserMenu language={language} />
          </div>
        </div>
      </div>
    </header>
  );
};
