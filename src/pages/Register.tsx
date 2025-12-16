import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    if (!formData.agreeToTerms) {
      alert('Необходимо согласиться с условиями использования');
      return;
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center gap-2 text-6xl mb-4 animate-bounce-slow">
            <span>🐾</span>
            <span>🐶</span>
            <span>🐱</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ПетСеть
          </h1>
          <p className="text-muted-foreground">
            Присоединяйтесь к сообществу любителей питомцев!
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Регистрация</CardTitle>
            <CardDescription className="text-center">
              Создайте аккаунт для вашего питомца
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <div className="relative">
                  <Icon name="User" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="vasya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Минимум 8 символов"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, agreeToTerms: checked as boolean })
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Я согласен с{' '}
                  <button type="button" className="text-primary hover:underline">
                    условиями использования
                  </button>
                  {' и '}
                  <button type="button" className="text-primary hover:underline">
                    политикой конфиденциальности
                  </button>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2 hover:scale-105 transition-transform"
              >
                <Icon name="UserPlus" size={18} />
                Зарегистрироваться
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Или зарегистрируйтесь через
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                <Icon name="Chrome" size={18} />
                Google
              </Button>
              <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                <Icon name="Github" size={18} />
                GitHub
              </Button>
            </div>

            <div className="text-center mt-6 text-sm">
              <span className="text-muted-foreground">Уже есть аккаунт? </span>
              <button
                type="button"
                className="text-primary font-semibold hover:underline"
                onClick={() => navigate('/login')}
              >
                Войти
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <div className="flex justify-center gap-4 text-4xl">
            <span>🐕</span>
            <span>🐈</span>
            <span>🐇</span>
            <span>🐦</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Поддерживаем всех питомцев!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
