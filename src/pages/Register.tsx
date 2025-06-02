
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { RegistrationForm } from "@/components/auth/RegistrationForm";
import { OTPVerificationForm } from "@/components/auth/OTPVerificationForm";

const Register = () => {
  const { language, setLanguage } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'register' | 'otp'>('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    password: '',
    role: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.country || !formData.role) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        language === 'en' 
          ? 'Verification code sent to your email' 
          : 'تم إرسال رمز التحقق إلى بريدك الإلكتروني'
      );
      
      setStep('otp');
    } catch (error) {
      toast.error(language === 'en' ? 'Registration failed' : 'فشل في التسجيل');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: formData.fullName,
        email: formData.email,
        role: formData.role as 'company' | 'supplier' | 'freelancer' | 'browser'
      };
      
      await login(formData.email, formData.password);
      
      toast.success(
        language === 'en' ? 'Account created successfully!' : 'تم إنشاء الحساب بنجاح!'
      );
      
      navigate('/dashboard');
    } catch (error) {
      toast.error(language === 'en' ? 'Invalid verification code' : 'رمز التحقق غير صحيح');
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(language === 'en' ? 'Code resent successfully' : 'تم إعادة إرسال الرمز بنجاح');
    setIsLoading(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  if (step === 'otp') {
    return (
      <AuthLayout
        title={language === 'en' ? 'Email Verification' : 'تحقق من البريد الإلكتروني'}
        description={
          language === 'en' 
            ? `We sent a 6-digit verification code to ${formData.email}` 
            : `تم إرسال رمز تحقق مكوّن من 6 أرقام إلى ${formData.email}`
        }
      >
        <OTPVerificationForm
          email={formData.email}
          onSubmit={handleOtpVerification}
          onResend={resendOtp}
          onBack={() => setStep('register')}
          isLoading={isLoading}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title={language === 'en' ? 'Create Your Account' : 'إنشاء حساب جديد'}
      description={
        language === 'en' 
          ? 'Join the smart contracting platform' 
          : 'انضم إلى منصة التعاقد الذكي'
      }
    >
      <RegistrationForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleRegister}
        isLoading={isLoading}
        onLanguageToggle={toggleLanguage}
      />
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}
        </p>
        <Button variant="link" onClick={() => navigate('/login')}>
          {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Register;
