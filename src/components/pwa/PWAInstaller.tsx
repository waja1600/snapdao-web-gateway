import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PawPrint, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

/**
 * PWA Installer Component
 * 
 * Features:
 * - Detects PWA installation capability
 * - Shows install prompt when appropriate
 * - Handles install process with user feedback
 * - Responsive design for mobile and desktop
 * 
 * Usage: Place in main app layout for global availability
 */

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstaller: React.FC = () => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if app is already installed (running in standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppMode = (window.navigator as any).standalone;
    
    if (isStandalone || isInWebAppMode) {
      setShowInstallButton(false);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      
      // Store the event for later use
      setDeferredPrompt(e);
      setShowInstallButton(true);
      
      console.log('PWA: Install prompt available');
    };

    // Listen for app install completion
    const handleAppInstalled = () => {
      console.log('PWA: App installed successfully');
      setShowInstallButton(false);
      setDeferredPrompt(null);
      
      toast.success(
        language === 'ar' 
          ? 'تم تثبيت التطبيق بنجاح!' 
          : 'App installed successfully!'
      );
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [language]);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.log('PWA: No install prompt available');
      return;
    }

    setIsInstalling(true);

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user's response
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA: User accepted the install prompt');
        toast.success(
          language === 'ar' 
            ? 'جاري تثبيت التطبيق...' 
            : 'Installing app...'
        );
      } else {
        console.log('PWA: User dismissed the install prompt');
        toast.info(
          language === 'ar' 
            ? 'تم إلغاء التثبيت' 
            : 'Installation cancelled'
        );
      }
      
      // Clear the stored prompt
      setDeferredPrompt(null);
      setShowInstallButton(false);
    } catch (error) {
      console.error('PWA: Error during installation:', error);
      toast.error(
        language === 'ar' 
          ? 'فشل في تثبيت التطبيق' 
          : 'Failed to install app'
      );
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallButton(false);
    toast.info(
      language === 'ar' 
        ? 'يمكنك تثبيت التطبيق لاحقاً من قائمة المتصفح' 
        : 'You can install the app later from browser menu'
    );
  };

  // Don't show if no install prompt is available
  if (!showInstallButton || !deferredPrompt) {
    return null;
  }

  return (
    <div className="pwa-install-btn group" role="button" tabIndex={0}>
      <Button
        onClick={handleInstall}
        disabled={isInstalling}
        size="lg"
        className="relative bg-transparent hover:bg-transparent p-0 h-full w-full rounded-full group-hover:scale-110 transition-transform duration-300"
        aria-label={language === 'ar' ? 'تثبيت التطبيق على الجهاز' : 'Install app to device'}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <PawPrint 
            className={`h-6 w-6 ${isInstalling ? 'animate-pulse' : 'float-animation'}`} 
            aria-hidden="true"
          />
          <span className="text-xs font-medium hidden group-hover:block absolute -top-12 bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap">
            {language === 'ar' ? 'تثبيت التطبيق' : 'Install App'}
          </span>
        </div>
      </Button>
      
      {/* Dismiss button */}
      <Button
        onClick={handleDismiss}
        size="sm"
        variant="ghost"
        className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-background border border-border rounded-full hover:bg-destructive hover:text-destructive-foreground"
        aria-label={language === 'ar' ? 'إخفاء زر التثبيت' : 'Hide install button'}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default PWAInstaller;