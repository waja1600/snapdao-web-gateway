
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building, 
  ShoppingCart, 
  Megaphone, 
  FileText, 
  Gavel,
  CreditCard,
  Map,
  TrendingUp,
  UserCheck,
  MessageCircle
} from 'lucide-react';

/**
 * Invoice Sitemap Component
 * 
 * Purpose: Provides comprehensive navigation structure within invoice context
 * Features:
 * - Platform-wide navigation map
 * - Contextual links relevant to invoicing workflow
 * - Multi-language support
 * - Visual hierarchy with icons and descriptions
 * 
 * Architecture:
 * - Organized by functional areas (Main, Financial, Management)
 * - Uses consistent routing patterns
 * - Implements responsive grid layout
 */

interface SitemapSection {
  title: string;
  items: SitemapItem[];
}

interface SitemapItem {
  path: string;
  label: string;
  description: string;
  icon: React.ElementType;
  external?: boolean;
}

export const InvoiceSitemap: React.FC = () => {
  const { language } = useLanguage();

  // Sitemap structure - organized by functional areas for maintainability
  const sitemapSections: SitemapSection[] = [
    {
      title: language === 'ar' ? 'الصفحات الرئيسية' : 'Main Pages',
      items: [
        {
          path: '/',
          label: language === 'ar' ? 'الصفحة الرئيسية' : 'Home',
          description: language === 'ar' ? 'الصفحة الرئيسية للمنصة' : 'Platform homepage',
          icon: Home
        },
        {
          path: '/dashboard',
          label: language === 'ar' ? 'لوحة التحكم' : 'Dashboard',
          description: language === 'ar' ? 'لوحة التحكم الشخصية' : 'Personal dashboard',
          icon: Building
        },
        {
          path: '/gpo-platform',
          label: language === 'ar' ? 'منصة GPO' : 'GPO Platform',
          description: language === 'ar' ? 'المنصة الرئيسية للتعاون' : 'Main collaboration platform',
          icon: Users
        }
      ]
    },
    {
      title: language === 'ar' ? 'البوابات الخدمية' : 'Service Gateways',
      items: [
        {
          path: '/cooperative-buying',
          label: language === 'ar' ? 'الشراء التعاوني' : 'Cooperative Buying',
          description: language === 'ar' ? 'منصة الشراء الجماعي' : 'Group purchasing platform',
          icon: ShoppingCart
        },
        {
          path: '/cooperative-marketing',
          label: language === 'ar' ? 'التسويق التعاوني' : 'Cooperative Marketing',
          description: language === 'ar' ? 'حملات التسويق المشتركة' : 'Joint marketing campaigns',
          icon: Megaphone
        },
        {
          path: '/company-formation',
          label: language === 'ar' ? 'تأسيس الشركات' : 'Company Formation',
          description: language === 'ar' ? 'خدمات تأسيس الشركات' : 'Company incorporation services',
          icon: Building
        },
        {
          path: '/supplier-sourcing',
          label: language === 'ar' ? 'الموردون والمستقلون' : 'Suppliers & Freelancers',
          description: language === 'ar' ? 'شبكة الموردين والمستقلين' : 'Supplier and freelancer network',
          icon: UserCheck
        }
      ]
    },
    {
      title: language === 'ar' ? 'الإدارة المالية' : 'Financial Management',
      items: [
        {
          path: '/invoices',
          label: language === 'ar' ? 'الفواتير' : 'Invoices',
          description: language === 'ar' ? 'إدارة الفواتير والمدفوعات' : 'Invoice and payment management',
          icon: FileText
        },
        {
          path: '/expenses',
          label: language === 'ar' ? 'المصروفات' : 'Expenses',
          description: language === 'ar' ? 'تتبع المصروفات والميزانيات' : 'Expense tracking and budgets',
          icon: CreditCard
        },
        {
          path: '/investment-gateway',
          label: language === 'ar' ? 'بوابة الاستثمار' : 'Investment Gateway',
          description: language === 'ar' ? 'إنشاء وإدارة الاستثمارات' : 'Investment creation and management',
          icon: TrendingUp
        }
      ]
    },
    {
      title: language === 'ar' ? 'إدارة المشاريع' : 'Project Management',
      items: [
        {
          path: '/projects',
          label: language === 'ar' ? 'المشاريع' : 'Projects',
          description: language === 'ar' ? 'إدارة المشاريع النشطة' : 'Active project management',
          icon: Building
        },
        {
          path: '/proposals',
          label: language === 'ar' ? 'المقترحات' : 'Proposals',
          description: language === 'ar' ? 'مقترحات المشاريع والخدمات' : 'Project and service proposals',
          icon: FileText
        },
        {
          path: '/voting',
          label: language === 'ar' ? 'التصويت' : 'Voting',
          description: language === 'ar' ? 'نظام التصويت والقرارات' : 'Voting and decision system',
          icon: Users
        },
        {
          path: '/arbitration',
          label: language === 'ar' ? 'التحكيم' : 'Arbitration',
          description: language === 'ar' ? 'نظام التحكيم وحل النزاعات' : 'Arbitration and dispute resolution',
          icon: Gavel
        }
      ]
    },
    {
      title: language === 'ar' ? 'إدارة المجموعات' : 'Group Management',
      items: [
        {
          path: '/groups',
          label: language === 'ar' ? 'مجموعاتي' : 'My Groups',
          description: language === 'ar' ? 'المجموعات التي أنتمي إليها' : 'Groups I belong to',
          icon: Users
        },
        {
          path: '/create-group',
          label: language === 'ar' ? 'إنشاء مجموعة' : 'Create Group',
          description: language === 'ar' ? 'إنشاء مجموعة عمل جديدة' : 'Create new work group',
          icon: Users
        },
        {
          path: '/members',
          label: language === 'ar' ? 'الأعضاء' : 'Members',
          description: language === 'ar' ? 'إدارة أعضاء المجموعات' : 'Group member management',
          icon: UserCheck
        }
      ]
    },
    {
      title: language === 'ar' ? 'الدعم والمساعدة' : 'Support & Help',
      items: [
        {
          path: '/how-it-works',
          label: language === 'ar' ? 'كيف تعمل المنصة' : 'How It Works',
          description: language === 'ar' ? 'دليل استخدام المنصة' : 'Platform usage guide',
          icon: MessageCircle
        },
        {
          path: '/about',
          label: language === 'ar' ? 'من نحن' : 'About Us',
          description: language === 'ar' ? 'معلومات عن المنصة' : 'Platform information',
          icon: Building
        },
        {
          path: '/faq',
          label: language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ',
          description: language === 'ar' ? 'الأسئلة الأكثر شيوعاً' : 'Frequently asked questions',
          icon: MessageCircle
        },
        {
          path: '/contact',
          label: language === 'ar' ? 'اتصل بنا' : 'Contact Us',
          description: language === 'ar' ? 'طرق التواصل معنا' : 'Contact information',
          icon: MessageCircle
        }
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          {language === 'ar' ? 'خريطة الموقع' : 'Site Navigation Map'}
        </CardTitle>
        <p className="text-sm text-gray-600">
          {language === 'ar' 
            ? 'دليل شامل لجميع صفحات وخدمات المنصة' 
            : 'Comprehensive guide to all platform pages and services'
          }
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sitemapSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Header */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                {section.title}
              </h3>
              
              {/* Section Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="group">
                    {item.external ? (
                      // External links - open in new tab
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border rounded-lg hover:shadow-md transition-all duration-200 group-hover:border-blue-300"
                      >
                        <div className="flex items-start gap-3">
                          <item.icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    ) : (
                      // Internal links - use React Router
                      <Link
                        to={item.path}
                        className="block p-4 border rounded-lg hover:shadow-md transition-all duration-200 group-hover:border-blue-300"
                      >
                        <div className="flex items-start gap-3">
                          <item.icon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            {language === 'ar' 
              ? '💡 تلميح: يمكنك الوصول إلى هذه الخريطة من أي صفحة في المنصة لسهولة التنقل'
              : '💡 Tip: You can access this sitemap from any page in the platform for easy navigation'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
