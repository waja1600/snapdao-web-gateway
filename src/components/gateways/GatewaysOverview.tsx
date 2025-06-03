
import React from 'react';
import { GatewayCard } from './GatewayCard';
import { ShoppingCart, Megaphone, Building, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const GatewaysOverview: React.FC = () => {
  const { language } = useLanguage();

  const gateways = [
    {
      title: language === 'en' ? 'Group Buying' : 'الشراء الجماعي',
      description: language === 'en' 
        ? 'Join group purchases to get better prices through collective bargaining power.'
        : 'انضم إلى المشتريات الجماعية للحصول على أسعار أفضل من خلال القوة التفاوضية الجماعية.',
      icon: ShoppingCart,
      route: '/group-buying',
      status: 'active' as const,
      features: [
        language === 'en' ? 'Bulk purchasing discounts' : 'خصومات الشراء بالجملة',
        language === 'en' ? 'Quality assurance' : 'ضمان الجودة',
        language === 'en' ? 'Collective negotiations' : 'المفاوضات الجماعية',
        language === 'en' ? 'Escrow protection' : 'حماية الضمان'
      ],
      memberCount: 1248,
      recentActivity: language === 'en' ? '5 new deals this week' : '5 صفقات جديدة هذا الأسبوع'
    },
    {
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en'
        ? 'Collaborate on marketing campaigns and share costs for better reach and impact.'
        : 'تعاون في حملات التسويق وتقاسم التكاليف لوصول وتأثير أفضل.',
      icon: Megaphone,
      route: '/cooperative-marketing',
      status: 'beta' as const,
      features: [
        language === 'en' ? 'Shared campaign costs' : 'تقاسم تكاليف الحملة',
        language === 'en' ? 'Cross-promotion' : 'الترويج المتبادل',
        language === 'en' ? 'Analytics sharing' : 'مشاركة التحليلات',
        language === 'en' ? 'Brand collaboration' : 'تعاون العلامات التجارية'
      ],
      memberCount: 847,
      recentActivity: language === 'en' ? '3 campaigns launched' : 'تم إطلاق 3 حملات'
    },
    {
      title: language === 'en' ? 'Company Incorporation' : 'تأسيس الشركات',
      description: language === 'en'
        ? 'Streamlined company formation with legal support and compliance management.'
        : 'تأسيس الشركات المبسط مع الدعم القانوني وإدارة الامتثال.',
      icon: Building,
      route: '/company-incorporation',
      status: 'active' as const,
      features: [
        language === 'en' ? 'Legal documentation' : 'التوثيق القانوني',
        language === 'en' ? 'Compliance tracking' : 'تتبع الامتثال',
        language === 'en' ? 'Multi-jurisdiction support' : 'دعم متعدد الولايات القضائية',
        language === 'en' ? 'Expert consultation' : 'استشارة الخبراء'
      ],
      memberCount: 532,
      recentActivity: language === 'en' ? '12 companies formed' : 'تم تأسيس 12 شركة'
    },
    {
      title: language === 'en' ? 'Suppliers & Freelancers' : 'الموردون والمستقلون',
      description: language === 'en'
        ? 'Connect with verified suppliers and skilled freelancers for all your business needs.'
        : 'تواصل مع موردين موثقين ومستقلين مهرة لجميع احتياجات عملك.',
      icon: Users,
      route: '/suppliers-freelancers',
      status: 'active' as const,
      features: [
        language === 'en' ? 'Verified profiles' : 'ملفات تعريف موثقة',
        language === 'en' ? 'Skill-based matching' : 'مطابقة قائمة على المهارات',
        language === 'en' ? 'Project management tools' : 'أدوات إدارة المشاريع',
        language === 'en' ? 'Payment protection' : 'حماية الدفع'
      ],
      memberCount: 2156,
      recentActivity: language === 'en' ? '89 projects completed' : 'تم إكمال 89 مشروع'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {language === 'en' ? 'Platform Gateways' : 'بوابات المنصة'}
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {language === 'en' 
            ? 'Access specialized business services through our four main gateways, each designed to empower collaboration and growth.'
            : 'الوصول إلى خدمات الأعمال المتخصصة من خلال بواباتنا الأربع الرئيسية، كل منها مصمم لتمكين التعاون والنمو.'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gateways.map((gateway, index) => (
          <GatewayCard key={index} {...gateway} />
        ))}
      </div>
    </div>
  );
};
