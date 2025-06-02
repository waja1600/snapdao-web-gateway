
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Globe, Mail, User, MapPin, Lock } from "lucide-react";

const Register = () => {
  const { t, language, setLanguage } = useLanguage();
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
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.country || !formData.role) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate sending OTP
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
    if (otpCode.length !== 6) {
      toast.error(language === 'en' ? 'Please enter 6-digit code' : 'يرجى إدخال رمز من 6 أرقام');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login
      const mockUser = {
        id: '1',
        name: formData.fullName,
        email: formData.email,
        role: formData.role,
        country: formData.country
      };
      
      login(mockUser);
      
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
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">GPOsaas</CardTitle>
            <CardDescription className="mt-4">
              {language === 'en' 
                ? 'We sent a 6-digit verification code to your email' 
                : 'تم إرسال رمز تحقق مكوّن من 6 أرقام إلى بريدك الإلكتروني'}
            </CardDescription>
            <p className="text-sm text-gray-600">{formData.email}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div>
                <Label htmlFor="otp">{t('verificationCode')}</Label>
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
              
              <Button type="button" variant="outline" className="w-full" onClick={resendOtp} disabled={isLoading}>
                {language === 'en' ? 'Resend Code' : 'إعادة إرسال الرمز'}
              </Button>
              
              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('register')}>
                {language === 'en' ? 'Back to Registration' : 'العودة للتسجيل'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-blue-600">GPOsaas</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
            >
              <Globe className="h-5 w-5" />
            </Button>
          </div>
          <CardTitle className="text-xl">
            {language === 'en' ? 'Create Your Account' : 'إنشاء حساب جديد'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Join the smart contracting platform' 
              : 'انضم إلى منصة التعاقد الذكي'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="fullName">{t('fullName')}</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder={language === 'en' ? 'Enter your full name' : 'أدخل اسمك الكامل'}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                required
              />
            </div>

            <div>
              <Label htmlFor="country">{t('country')}</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select your country' : 'اختر دولتك'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">{t('sa')}</SelectItem>
                  <SelectItem value="ae">{t('ae')}</SelectItem>
                  <SelectItem value="eg">{t('eg')}</SelectItem>
                  <SelectItem value="jo">{t('jo')}</SelectItem>
                  <SelectItem value="kw">{t('kw')}</SelectItem>
                  <SelectItem value="qa">{t('qa')}</SelectItem>
                  <SelectItem value="other">{t('other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="role">{t('selectRole')}</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Choose your role' : 'اختر دورك'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">{t('roleCompany')}</SelectItem>
                  <SelectItem value="supplier">{t('roleSupplier')}</SelectItem>
                  <SelectItem value="freelancer">{t('roleFreelancer')}</SelectItem>
                  <SelectItem value="browser">{language === 'en' ? 'Just Browse' : 'تصفح فقط'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder={language === 'en' ? 'Create a password' : 'أنشئ كلمة مرور'}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              <User className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Create My Account Now' : 'أنشئ حسابي الآن'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}
              </p>
              <Button variant="link" onClick={() => navigate('/login')}>
                {language === 'en' ? 'Sign In' : 'تسجيل الدخول'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
