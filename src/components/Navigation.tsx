import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-3xl animate-bounce-slow">🐾</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ПетСеть
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant={isActive('/') ? 'default' : 'ghost'}
              className="gap-2 hover:scale-105 transition-transform"
              onClick={() => navigate('/')}
            >
              <Icon name="Home" size={20} />
              <span>Главная</span>
            </Button>
            <Button 
              variant={isActive('/challenges') ? 'default' : 'ghost'}
              className="gap-2 hover:scale-105 transition-transform"
              onClick={() => navigate('/challenges')}
            >
              <Icon name="Trophy" size={20} />
              <span>Челленджи</span>
            </Button>
            <Button 
              variant={isActive('/messages') ? 'default' : 'ghost'}
              className="gap-2 hover:scale-105 transition-transform relative"
              onClick={() => navigate('/messages')}
            >
              <Icon name="MessageCircle" size={20} />
              <span>Сообщения</span>
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                2
              </Badge>
            </Button>
            <Button 
              variant="ghost" 
              className="gap-2 hover:scale-105 transition-transform"
            >
              <Icon name="Bell" size={20} />
              <span>Уведомления</span>
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button 
              variant={isActive('/profile') ? 'default' : 'ghost'}
              size="sm" 
              className="gap-2 hover:scale-105 transition-transform"
              onClick={() => navigate('/profile')}
            >
              <Icon name="User" size={16} />
              Профиль
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 hover:scale-105 transition-transform"
              onClick={() => navigate('/login')}
            >
              <Icon name="LogIn" size={16} />
              Вход
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
