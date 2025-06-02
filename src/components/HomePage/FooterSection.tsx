
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export const FooterSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const footerLinks = {
    company: {
      title: language === 'en' ? 'Company' : 'الشركة',
      links: [
        { label: language === 'en' ? 'About Us' : 'من نحن', href: '/about' },
        { label: language === 'en' ? 'How It Works' : 'كيف تعمل', href: '/how-it-works' },
        { label: language === 'en' ? 'Careers' : 'الوظائف', href: '/careers' },
        { label: language === 'en' ? 'Press' : 'الإعلام', href: '/press' },
        { label: language === 'en' ? 'Blog' : 'المدونة', href: '/blog' }
      ]
    },
    services: {
      title: language === 'en' ? 'Services' : 'الخدمات',
      links: [
        { label: language === 'en' ? 'Group Buying' : 'الشراء الجماعي', href: '/cooperative-buying' },
        { label: language === 'en' ? 'Marketing' : 'التسويق', href: '/cooperative-marketing' },
        { label: language === 'en' ? 'Freelancers' : 'المستقلون', href: '/freelancers' },
        { label: language === 'en' ? 'Suppliers' : 'الموردون', href: '/suppliers' },
        { label: language === 'en' ? 'Arbitration' : 'التحكيم', href: '/arbitration' }
      ]
    },
    support: {
      title: language === 'en' ? 'Support' : 'الدعم',
      links: [
        { label: language === 'en' ? 'Help Center' : 'مركز المساعدة', href: '/help' },
        { label: language === 'en' ? 'Contact Us' : 'اتصل بنا', href: '/contact' },
        { label: language === 'en' ? 'FAQ' : 'الأسئلة الشائعة', href: '/faq' },
        { label: language === 'en' ? 'Community' : 'المجتمع', href: '/community' },
        { label: language === 'en' ? 'API Documentation' : 'وثائق API', href: '/api-docs' }
      ]
    },
    legal: {
      title: language === 'en' ? 'Legal' : 'قانوني',
      links: [
        { label: language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية', href: '/privacy' },
        { label: language === 'en' ? 'Terms of Service' : 'شروط الخدمة', href: '/terms' },
        { label: language === 'en' ? 'Cookie Policy' : 'سياسة الكوكيز', href: '/cookies' },
        { label: language === 'en' ? 'Sitemap' : 'خريطة الموقع', href: '/sitemap' },
        { label: language === 'en' ? 'Admin Access' : 'دخول المدير', href: '/admin-access' }
      ]
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'en' 
                ? 'Stay Updated with Latest Opportunities' 
                : 'ابق على اطلاع بأحدث الفرص'}
            </h3>
            <p className="text-gray-400 mb-6">
              {language === 'en' 
                ? 'Get notified about new groups, exclusive deals, and platform updates.'
                : 'احصل على إشعارات حول المجموعات الجديدة والصفقات الحصرية وتحديثات المنصة.'}
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input 
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button>
                {language === 'en' ? 'Subscribe' : 'اشترك'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">GPOsaas</h2>
            <p className="text-gray-400 mb-6">
              {language === 'en' 
                ? 'The smart cooperation platform connecting buyers, suppliers, and freelancers for better deals and efficient collaboration.'
                : 'منصة التعاون الذكي التي تربط المشترين والموردين والمستقلين لصفقات أفضل وتعاون فعال.'}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@gposaas.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+966 11 234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{language === 'en' ? 'Riyadh, Saudi Arabia' : 'الرياض، السعودية'}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 GPOsaas. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
            </div>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">
                {language === 'en' ? 'Follow us:' : 'تابعنا:'}
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Language & Currency Quick Switch */}
            <div className="flex items-center gap-2 text-sm">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-8">
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              <Separator orientation="vertical" className="h-4 bg-gray-700" />
              <span className="text-gray-400">SAR</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
