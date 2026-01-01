import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Вход выполнен',
        description: 'Добро пожаловать в ПетСеть!'
      });
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: 'Проверьте правильность введенных данных',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
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
            Социальная сеть для любителей питомцев
          </p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Вход в аккаунт</CardTitle>
            <CardDescription className="text-center">
              Введите ваши данные для входа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2 hover:scale-105 transition-transform"
                disabled={isLoading}
              >
                <Icon name="LogIn" size={18} />
                {isLoading ? 'Вход...' : 'Войти'}
              </Button>

              <div className="text-center text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-semibold mb-1">Тестовые данные администратора:</p>
                <p>Email: <code className="text-primary">admin@petnet.ru</code></p>
                <p>Пароль: <code className="text-primary">admin123</code></p>
              </div>

              <div className="text-center text-sm">
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => navigate('/forgot-password')}
                >
                  Забыли пароль?
                </button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Или войдите через
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
              <span className="text-muted-foreground">Нет аккаунта? </span>
              <button
                type="button"
                className="text-primary font-semibold hover:underline"
                onClick={() => navigate('/register')}
              >
                Зарегистрироваться
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>Продолжая, вы соглашаетесь с нашими</p>
          <p>
            <button className="hover:underline">Условиями использования</button>
            {' и '}
            <button className="hover:underline">Политикой конфиденциальности</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;