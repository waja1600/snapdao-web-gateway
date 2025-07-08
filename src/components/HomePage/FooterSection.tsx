
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, Phone, MapPin, Globe, 
  Facebook, Twitter, Linkedin, Instagram,
  FileText, Shield, HelpCircle, Users
} from "lucide-react";
import { Link } from "react-router-dom";

export const FooterSection = () => {
  const { language } = useLanguage();

  const footerSections = [
    {
      title: language === 'ar' ? 'المنصة' : 'Platform',
      links: [
        { name: language === 'ar' ? 'عن المنصة' : 'About Us', href: '/about' },
        { name: language === 'ar' ? 'كيف تعمل' : 'How It Works', href: '/how-it-works' },
        { name: language === 'ar' ? 'الأسعار' : 'Pricing', href: '/pricing' },
        { name: language === 'ar' ? 'المميزات' : 'Features', href: '/features' }
      ]
    },
    {
      title: language === 'ar' ? 'البوابات' : 'Portals',
      links: [
        { name: language === 'ar' ? 'الشراء التعاوني' : 'Cooperative Purchasing', href: '/cooperative-buying' },
        { name: language === 'ar' ? 'التسويق التعاوني' : 'Cooperative Marketing', href: '/cooperative-marketing' },
        { name: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation', href: '/company-formation' },
        { name: language === 'ar' ? 'المستقلون' : 'Freelancers', href: '/freelancers' }
      ]
    },
    {
      title: language === 'ar' ? 'الدعم' : 'Support',
      links: [
        { name: language === 'ar' ? 'مركز المساعدة' : 'Help Center', href: '/help' },
        { name: language === 'ar' ? 'الاتصال بنا' : 'Contact Us', href: '/contact' },
        { name: language === 'ar' ? 'الدعم الفني' : 'Technical Support', href: '/support' },
        { name: language === 'ar' ? 'التدريب' : 'Training', href: '/training' }
      ]
    },
    {
      title: language === 'ar' ? 'قانوني' : 'Legal',
      links: [
        { name: language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service', href: '/terms' },
        { name: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy', href: '/privacy' },
        { name: language === 'ar' ? 'سياسة الملفات' : 'Cookie Policy', href: '/cookies' },
        { name: language === 'ar' ? 'إخلاء المسؤولية' : 'Disclaimer', href: '/disclaimer' }
      ]
    }
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="container-responsive py-12 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'ابق على اطلاع بآخر التحديثات' : 'Stay Updated with Latest News'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'اشترك في نشرتنا الإخبارية لتحصل على آخر الأخبار والعروض الحصرية'
              : 'Subscribe to our newsletter for the latest news and exclusive offers'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={language === 'ar' ? 'عنوان البريد الإلكتروني' : 'Email address'}
              className="flex-1"
            />
            <Button className="gradient-primary">
              {language === 'ar' ? 'اشتراك' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GPO</span>
              </div>
              <span className="gradient-text text-xl font-bold">GPO WORLD</span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {language === 'ar' 
                ? 'منصة الأعمال التعاونية الرائدة عالمياً التي تربط الشركات والأفراد لتحقيق وفورات هائلة وفرص استثمارية متميزة.'
                : 'The world\'s leading cooperative business platform connecting companies and individuals to achieve massive savings and exceptional investment opportunities.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@gpoworld.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{language === 'ar' ? 'متاح عالمياً' : 'Available Worldwide'}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container-responsive py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>&copy; 2024 GPO WORLD. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</span>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{language === 'ar' ? 'متاح في 50+ دولة' : 'Available in 50+ countries'}</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
