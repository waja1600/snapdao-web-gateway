
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

interface OTPVerificationFormProps {
  email: string;
  onSubmit: (e: React.FormEvent) => void;
  onResend: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const OTPVerificationForm = ({ 
  email, 
  onSubmit, 
  onResend, 
  onBack, 
  isLoading 
}: OTPVerificationFormProps) => {
  const { language } = useLanguage();
  const [otpCode, setOtpCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="otp">
          {language === 'en' ? 'Verification Code' : 'رمز التحقق'}
        </Label>
        <Input
          id="otp"
          type="text"
          maxLength={6}
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
          placeholder="123456"
          className="text-center text-2xl tracking-widest"
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        <Mail className="w-4 h-4 mr-2" />
        {language === 'en' ? 'Verify & Login' : 'تأكيد الدخول'}
      </Button>
      
      <Button type="button" variant="outline" className="w-full" onClick={onResend} disabled={isLoading}>
        {language === 'en' ? 'Resend Code' : 'إعادة إرسال الرمز'}
      </Button>
      
      <Button type="button" variant="ghost" className="w-full" onClick={onBack}>
        {language === 'en' ? 'Back to Registration' : 'العودة للتسجيل'}
      </Button>
    </form>
  );
};
