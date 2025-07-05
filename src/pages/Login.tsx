
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';

const Login = () => {
  const { language } = useLanguage();
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', fullName: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (!error) {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(signupData.email, signupData.password, signupData.fullName);
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gpo-primary to-gpo-primary-light rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">GPO</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Welcome to GPO Platform' : 'مرحباً بك في منصة GPO'}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {language === 'en' 
              ? 'Sign in to your account or create a new one'
              : 'سجل دخولك أو أنشئ حساباً جديداً'
            }
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              {language === 'en' ? 'Login' : 'تسجيل الدخول'}
            </TabsTrigger>
            <TabsTrigger value="signup">
              {language === 'en' ? 'Sign Up' : 'إنشاء حساب'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Enter your credentials to access your account'
                    : 'أدخل بياناتك للوصول إلى حسابك'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">
                      {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">
                      {language === 'en' ? 'Password' : 'كلمة المرور'}
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                   <Button type="submit" className="w-full bg-gpo-primary hover:bg-gpo-primary-dark text-white" disabled={loading}>
                     {loading 
                       ? (language === 'en' ? 'Signing in...' : 'جاري تسجيل الدخول...')
                       : (language === 'en' ? 'Sign In' : 'تسجيل الدخول')
                     }
                   </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Create a new account to get started'
                    : 'أنشئ حساباً جديداً للبدء'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">
                      {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">
                      {language === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">
                      {language === 'en' ? 'Password' : 'كلمة المرور'}
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </div>
                   <Button type="submit" className="w-full bg-gpo-secondary hover:bg-gpo-secondary/90 text-white" disabled={loading}>
                     {loading 
                       ? (language === 'en' ? 'Creating account...' : 'جاري إنشاء الحساب...')
                       : (language === 'en' ? 'Create Account' : 'إنشاء حساب')
                     }
                   </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Link to="/" className="text-gpo-primary hover:text-gpo-primary-dark transition-colors">
            {language === 'en' ? 'Back to Home' : 'العودة للرئيسية'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
