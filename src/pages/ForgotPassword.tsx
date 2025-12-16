import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type Step = 'email' | 'code' | 'newPassword' | 'success';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('code');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      setStep('newPassword');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    setStep('success');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2 text-6xl mb-4 animate-bounce-slow">
            <span>🐾</span>
            <span>🔐</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ПетСеть
          </h1>
          <p className="text-muted-foreground">
            Восстановление доступа к аккаунту
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          {step === 'email' && (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Забыли пароль?</CardTitle>
                <CardDescription className="text-center">
                  Введите email для получения кода восстановления
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="vasya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2 hover:scale-105 transition-transform"
                  >
                    <Icon name="Send" size={18} />
                    Отправить код
                  </Button>

                  <Button 
                    type="button"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => navigate('/login')}
                  >
                    <Icon name="ArrowLeft" size={18} />
                    Вернуться к входу
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === 'code' && (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Проверьте почту</CardTitle>
                <CardDescription className="text-center">
                  Мы отправили код на {email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="text-5xl">📧</div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="code">Код подтверждения</Label>
                    <Input
                      id="code"
                      type="text"
                      placeholder="000000"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-2xl tracking-widest"
                      maxLength={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground text-center">
                      Введите 6-значный код из письма
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2 hover:scale-105 transition-transform"
                    disabled={code.length !== 6}
                  >
                    <Icon name="Check" size={18} />
                    Подтвердить код
                  </Button>

                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Не получили код? </span>
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={handleSendCode}
                    >
                      Отправить снова
                    </button>
                  </div>

                  <Button 
                    type="button"
                    variant="ghost"
                    className="w-full gap-2"
                    onClick={() => setStep('email')}
                  >
                    <Icon name="ArrowLeft" size={18} />
                    Изменить email
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === 'newPassword' && (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Новый пароль</CardTitle>
                <CardDescription className="text-center">
                  Придумайте надёжный пароль
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Новый пароль</Label>
                    <div className="relative">
                      <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Минимум 8 символов"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="pl-10"
                        minLength={8}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                    <div className="relative">
                      <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    <p className="font-semibold">Требования к паролю:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2">
                        <Icon name={newPassword.length >= 8 ? "Check" : "X"} size={14} />
                        Минимум 8 символов
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name={/[A-Z]/.test(newPassword) ? "Check" : "X"} size={14} />
                        Заглавная буква
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name={/[0-9]/.test(newPassword) ? "Check" : "X"} size={14} />
                        Цифра
                      </li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2 hover:scale-105 transition-transform"
                  >
                    <Icon name="Shield" size={18} />
                    Сохранить пароль
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {step === 'success' && (
            <>
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={48} className="text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-center">Успешно!</CardTitle>
                <CardDescription className="text-center">
                  Ваш пароль был успешно изменён
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-center gap-2 text-4xl">
                    <span>🎉</span>
                    <span>🐾</span>
                    <span>🎉</span>
                  </div>

                  <Button 
                    onClick={handleGoToLogin}
                    className="w-full gap-2 hover:scale-105 transition-transform"
                  >
                    <Icon name="LogIn" size={18} />
                    Войти в аккаунт
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Теперь вы можете войти с новым паролем
                  </p>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {step !== 'success' && (
          <div className="text-center text-xs text-muted-foreground">
            <p>Если письмо не пришло, проверьте папку "Спам"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
