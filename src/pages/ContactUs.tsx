
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactUs = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === 'en' ? 'Message sent!' : 'تم إرسال الرسالة!',
      description: language === 'en' 
        ? 'We will get back to you as soon as possible.' 
        : 'سنرد عليك في أقرب وقت ممكن.',
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: language === 'en' ? 'Email' : 'البريد الإلكتروني',
      info: 'contact@forgpo.com'
    },
    {
      icon: Phone,
      title: language === 'en' ? 'Phone' : 'الهاتف',
      info: '+1 (555) 123-4567'
    },
    {
      icon: MapPin,
      title: language === 'en' ? 'Address' : 'العنوان',
      info: language === 'en' ? '123 Business Avenue, Tech City, CA 94103' : '123 شارع الأعمال، مدينة التكنولوجيا، CA 94103'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
        </h1>
        
        <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600">
          {language === 'en' 
            ? 'Have questions or need assistance? Our team is here to help. Fill out the form below or reach out to us directly.'
            : 'هل لديك أسئلة أو تحتاج إلى مساعدة؟ فريقنا هنا للمساعدة. املأ النموذج أدناه أو تواصل معنا مباشرة.'}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.info}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Contact Form */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-6">
              {language === 'en' ? 'Send Us a Message' : 'أرسل لنا رسالة'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'en' ? 'Name' : 'الاسم'}
                  </label>
                  <Input required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                  </label>
                  <Input type="email" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'en' ? 'Subject' : 'الموضوع'}
                </label>
                <Input required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {language === 'en' ? 'Message' : 'الرسالة'}
                </label>
                <Textarea rows={5} required />
              </div>
              
              <Button type="submit" className="w-full">
                {language === 'en' ? 'Send Message' : 'إرسال الرسالة'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContactUs;
