
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="otp" className="text-center block font-medium">
          {language === 'en' ? 'Enter 6-digit verification code' : 'أدخل رمز التحقق المكون من 6 أرقام'}
        </Label>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={(value) => setOtpCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <input
          type="hidden"
          name="otp"
          value={otpCode}
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading || otpCode.length !== 6}>
        <Mail className="w-4 h-4 mr-2" />
        {language === 'en' ? 'Verify & Continue' : 'تأكيد والمتابعة'}
      </Button>
      
      <div className="space-y-2">
        <Button type="button" variant="outline" className="w-full" onClick={onResend} disabled={isLoading}>
          {language === 'en' ? 'Resend Code' : 'إعادة إرسال الرمز'}
        </Button>
        
        <Button type="button" variant="ghost" className="w-full" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Back to Registration' : 'العودة للتسجيل'}
        </Button>
      </div>
    </form>
  );
};
