import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const profile = {
    name: 'Рекс',
    type: 'Золотистый ретривер',
    age: '3 года',
    owner: 'Анна Петрова',
    location: 'Москва',
    bio: 'Обожаю играть в мяч и купаться в озере! Самый дружелюбный пёс на районе 🎾',
    avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
    followers: 1234,
    following: 567,
    posts: 89
  };

  const photos = [
    { id: 1, url: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg', likes: 45 },
    { id: 2, url: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg', likes: 67 },
    { id: 3, url: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', likes: 89 },
    { id: 4, url: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg', likes: 34 },
    { id: 5, url: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg', likes: 56 },
    { id: 6, url: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', likes: 78 }
  ];

  const friends = [
    { id: 1, name: 'Барсик', type: 'Кот', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', emoji: '🐱' },
    { id: 2, name: 'Макс', type: 'Щенок', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg', emoji: '🐶' },
    { id: 3, name: 'Мурка', type: 'Кошка', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', emoji: '🐱' },
    { id: 4, name: 'Шарик', type: 'Пёс', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg', emoji: '🐕' },
    { id: 5, name: 'Лаки', type: 'Щенок', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg', emoji: '🐶' },
    { id: 6, name: 'Симба', type: 'Кот', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', emoji: '🐱' }
  ];

  const achievements = [
    { id: 1, title: 'Первый пост', icon: '🎉', description: 'Опубликовал первый пост' },
    { id: 2, title: 'Популярный', icon: '⭐', description: '100+ лайков на посте' },
    { id: 3, title: 'Дружелюбный', icon: '🤝', description: '50+ друзей' },
    { id: 4, title: 'Фотограф', icon: '📸', description: '25+ фотографий' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
              <span>Назад</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="text-2xl animate-bounce-slow">🐾</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ПетСеть
              </h1>
            </div>

            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card className="border-2 shadow-xl animate-fade-in mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"></div>
          
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl ring-4 ring-primary/20">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-3xl">{profile.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {profile.name} 
                    <span className="text-2xl">🐕</span>
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{profile.type}</Badge>
                    <span>•</span>
                    <span>{profile.age}</span>
                    <span>•</span>
                    <Icon name="MapPin" size={14} className="inline" />
                    <span>{profile.location}</span>
                  </p>
                </div>

                <p className="text-base leading-relaxed">{profile.bio}</p>

                <div className="flex items-center gap-2 text-sm">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Хозяин:</span>
                  <span className="font-medium">{profile.owner}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">{profile.posts}</span>
                    <span className="text-muted-foreground">постов</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-bold text-xl">{profile.followers}</span>
                    <span className="text-muted-foreground">подписчиков</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-bold text-xl">{profile.following}</span>
                    <span className="text-muted-foreground">подписок</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="gap-2 hover:scale-105 transition-transform"
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? (
                      <>
                        <Icon name="UserCheck" size={16} />
                        Отписаться
                      </>
                    ) : (
                      <>
                        <Icon name="UserPlus" size={16} />
                        Подписаться
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                    <Icon name="MessageCircle" size={16} />
                    Сообщение
                  </Button>
                  <Button variant="outline" size="icon" className="hover:scale-105 transition-transform">
                    <Icon name="Gift" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="photos" className="gap-2">
              <Icon name="Image" size={16} />
              Фото
            </TabsTrigger>
            <TabsTrigger value="friends" className="gap-2">
              <Icon name="Users" size={16} />
              Друзья
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Icon name="Award" size={16} />
              Достижения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <Card 
                  key={photo.id} 
                  className="group overflow-hidden border-2 hover:shadow-xl transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <img 
                      src={photo.url} 
                      alt={`Фото ${photo.id}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                        <Icon name="Heart" size={20} className="fill-white" />
                        <span className="font-bold">{photo.likes}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="friends" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend, index) => (
                <Card 
                  key={friend.id}
                  className="border-2 hover:shadow-lg transition-all cursor-pointer hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{friend.name}</h3>
                          <span className="text-xl">{friend.emoji}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{friend.type}</p>
                      </div>
                      <Button size="sm" variant="outline" className="hover:scale-105 transition-transform">
                        <Icon name="MessageCircle" size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card 
                  key={achievement.id}
                  className="border-2 hover:shadow-lg transition-all animate-fade-in bg-gradient-to-br from-primary/5 to-secondary/5"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl animate-bounce-slow">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <Icon name="CheckCircle2" size={24} className="text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 bg-muted">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-lg mb-2">Продолжай в том же духе!</h3>
                <p className="text-sm text-muted-foreground">
                  Получай больше достижений, публикуя посты и общаясь с друзьями
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border py-2 z-50">
        <div className="flex items-center justify-around px-4">
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
            <Icon name="Home" size={20} />
            <span className="text-xs">Главная</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
            <Icon name="Search" size={20} />
            <span className="text-xs">Поиск</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
            <Icon name="MessageCircle" size={20} />
            <span className="text-xs">Чаты</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col gap-1 h-auto py-2">
            <Icon name="User" size={20} />
            <span className="text-xs">Профиль</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Profile;