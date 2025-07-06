
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MessageCircle } from "lucide-react";

export const FooterSection = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">GPOsaas</h3>
            <p className="text-gray-300 mb-4">
              {language === 'en'
                ? 'Smart contracting platform connecting buyers, suppliers, and freelancers.'
                : 'منصة التعاقد الذكي التي تربط المشترين والموردين والمستقلين.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white">{language === 'en' ? 'About Us' : 'من نحن'}</a></li>
              <li><a href="/how-it-works" className="hover:text-white">{language === 'en' ? 'How It Works' : 'كيف تعمل المنصة'}</a></li>
              <li><a href="/support" className="hover:text-white">{language === 'en' ? 'Support & Help' : 'الدعم والمساعدة'}</a></li>
              <li><a href="/contact" className="hover:text-white">{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Legal' : 'قانوني'}
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/privacy" className="hover:text-white">{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a></li>
              <li><a href="/terms" className="hover:text-white">{language === 'en' ? 'Terms of Use' : 'شروط الاستخدام'}</a></li>
              <li><a href="/sitemap" className="hover:text-white">{language === 'en' ? 'Site Map' : 'خريطة الموقع'}</a></li>
            </ul>
          </div>

          {/* Language & Support */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' ? 'Settings' : 'الإعدادات'}
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {language === 'en' ? 'Language' : 'اللغة'}
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="w-full justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {language === 'en' ? 'Country' : 'الدولة'}
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={language === 'en' ? 'Select Country' : 'اختر الدولة'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa">{language === 'en' ? 'Saudi Arabia' : 'السعودية'}</SelectItem>
                    <SelectItem value="ae">{language === 'en' ? 'UAE' : 'الإمارات'}</SelectItem>
                    <SelectItem value="eg">{language === 'en' ? 'Egypt' : 'مصر'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Quick Support' : 'الدعم السريع'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-300">
          <p>© 2025 GPOsaas. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}</p>
        </div>
      </div>
    </footer>
  );
};
