
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDAO } from "@/contexts/DAOContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

const CollectiveAgreement = () => {
  const { t, language } = useLanguage();
  const { signAgreement } = useDAO();
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await signAgreement("agreement-123", password, otp);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{t('collectiveAgreement')}</h1>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className={language === 'ar' ? 'text-right' : 'text-left'}>
              <h2 className="text-xl font-semibold mb-4">{t('agreementText')}</h2>
              <div className="bg-gray-50 p-6 rounded-lg text-gray-700 max-h-64 overflow-y-auto mb-6">
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel lacinia quam. Nunc id purus ut lectus efficitur mollis. Quisque semper tristique magna, eu egestas neque mollis non. Suspendisse feugiat risus eget mi faucibus, eu ullamcorper sapien placerat.
                </p>
                <p className="mb-4">
                  Donec ut felis libero. Maecenas tincidunt mi vel dolor molestie, vel sollicitudin quam ultrices. Morbi fermentum vitae purus sit amet fermentum. Nullam euismod, odio non efficitur condimentum, neque magna aliquet massa, eu vulputate elit nulla ac diam.
                </p>
                <p>
                  Fusce dignissim neque nunc, vel aliquet turpis blandit et. Maecenas gravida quis nunc vel consectetur. Sed scelerisque luctus purus, non pellentesque magna placerat sed. Praesent in scelerisque augue. Sed non ipsum eu magna convallis suscipit.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="agreement" checked={agreed} onCheckedChange={(checked) => setAgreed(!!checked)} />
                <Label htmlFor="agreement" className="text-sm">
                  {t('agreeAndSign')}
                </Label>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="max-w-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="otp">{t('enterOTPCode')}</Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="max-w-md"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full md:w-auto"
                disabled={isSubmitting || !agreed}
              >
                {isSubmitting ? t('loading') : t('signContract')}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className={`${language === 'ar' ? 'text-right' : 'text-left'} space-y-4`}>
              <h2 className="font-semibold">{t('company')}</h2>
              <div className="text-sm">
                <p>Example Company</p>
                <p>{t('registrationNumber')}: 123456789</p>
                <p>contact@example.com</p>
                <p>example.com</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CollectiveAgreement;
