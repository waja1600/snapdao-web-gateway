
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OTPVerificationForm } from '@/components/auth/OTPVerificationForm';
import { RegistrationForm } from '@/components/auth/RegistrationForm';
import { Globe } from 'lucide-react';

const Register = () => {
  const { language, setLanguage } = useLanguage();
  const { signUp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.fullName);
    
    if (!error) {
      setStep('verify');
    }
    
    setLoading(false);
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const otpInput = formElement.querySelector('#otp') as HTMLInputElement;
    const otpValue = otpInput?.value;
    
    if (!otpValue) return;
    
    setLoading(true);
    const { error } = await verifyOtp(formData.email, otpValue);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    await signUp(formData.email, formData.password, formData.fullName);
    setLoading(false);
  };

  const handleBack = () => {
    setStep('register');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4 sm:px-6 lg:px-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            {step === 'register' 
              ? (language === 'en' ? 'Create Account' : 'إنشاء حساب')
              : (language === 'en' ? 'Verify Email' : 'تأكيد الإيميل')
            }
          </h2>
          <p className="mt-2 text-muted-foreground">
            {step === 'register' 
              ? (language === 'en' ? 'Join the GPO Platform' : 'انضم إلى منصة GPO')
              : (language === 'en' ? `Enter the code sent to ${formData.email}` : `أدخل الرمز المرسل إلى ${formData.email}`)
            }
          </p>
        </div>

        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {step === 'register' 
                  ? (language === 'en' ? 'Registration' : 'التسجيل')
                  : (language === 'en' ? 'Email Verification' : 'تأكيد الإيميل')
                }
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
              >
                <Globe className="h-5 w-5" />
              </Button>
            </CardTitle>
            <CardDescription>
              {step === 'register' 
                ? (language === 'en' ? 'Fill in your information to create an account' : 'املأ معلوماتك لإنشاء حساب')
                : (language === 'en' ? 'We sent a verification code to your email' : 'أرسلنا رمز التحقق إلى بريدك الإلكتروني')
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'register' ? (
              <RegistrationForm 
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={loading}
                onLanguageToggle={toggleLanguage}
              />
            ) : (
              <OTPVerificationForm 
                email={formData.email}
                onSubmit={handleOTPSubmit}
                onResend={handleResendOTP}
                onBack={handleBack}
                isLoading={loading}
              />
            )}
          </CardContent>
        </Card>

        {step === 'register' && (
          <div className="text-center">
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
              {language === 'en' ? 'Already have an account? Sign in' : 'لديك حساب بالفعل؟ سجل دخولك'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
