import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { mockAchievements, getRarityColor, getRarityName } from '@/data/achievements';

const Profile = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pets');

  const userLevel = 12;
  const userXP = 1450;
  const xpForNextLevel = 1300;
  const xpProgress = Math.min(100, Math.round((userXP / xpForNextLevel) * 100));
  
  const unlockedAchievements = mockAchievements.filter(a => a.unlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  const ownerProfile = {
    name: 'Анна Петрова',
    age: 28,
    location: 'Москва',
    bio: 'Любящая хозяйка трёх замечательных питомцев 🐾 Обожаю активный отдых с моими пушистыми друзьями!',
    avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
    followers: 2345,
    following: 876,
    posts: 156
  };

  const topSupporters = [
    {
      id: 1,
      name: 'Мария Смирнова',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      amount: 5000,
      date: '2 дня назад'
    },
    {
      id: 2,
      name: 'Дмитрий Волков',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      amount: 3500,
      date: '5 дней назад'
    },
    {
      id: 3,
      name: 'Елена Коваль',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      amount: 2000,
      date: '1 неделю назад'
    },
    {
      id: 4,
      name: 'Олег Сидоров',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      amount: 1500,
      date: '2 недели назад'
    },
    {
      id: 5,
      name: 'Ирина Павлова',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      amount: 1000,
      date: '3 недели назад'
    }
  ];

  const pets = [
    {
      id: 1,
      name: 'Рекс',
      type: 'Золотистый ретривер',
      age: '3 года',
      emoji: '🐕',
      bio: 'Обожаю играть в мяч и купаться в озере!',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      photos: [
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      ]
    },
    {
      id: 2,
      name: 'Барсик',
      type: 'Шотландская вислоухая',
      age: '2 года',
      emoji: '🐱',
      bio: 'Люблю спать на солнышке и ловить солнечных зайчиков',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      photos: [
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      ]
    },
    {
      id: 3,
      name: 'Макс',
      type: 'Лабрадор',
      age: '6 месяцев',
      emoji: '🐶',
      bio: 'Самый энергичный щенок в округе!',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      photos: [
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      ]
    }
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

      <main className="container mx-auto px-4 py-6 space-y-6">
        <Card className="border-2 shadow-xl animate-fade-in overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"></div>
          
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16">
              <div className="flex flex-col items-center gap-3">
                <Avatar className="w-32 h-32 border-4 border-background shadow-xl ring-4 ring-primary/20">
                  <AvatarImage src={ownerProfile.avatar} />
                  <AvatarFallback className="text-3xl">{ownerProfile.name[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex gap-2">
                  {pets.map(pet => (
                    <Avatar 
                      key={pet.id} 
                      className="w-12 h-12 border-2 border-background shadow-lg ring-2 ring-primary/10 hover:scale-110 transition-transform cursor-pointer"
                      title={pet.name}
                      onClick={() => navigate(`/pet/${pet.id}`)}
                    >
                      <AvatarImage src={pet.avatar} />
                      <AvatarFallback className="text-lg">{pet.emoji}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {ownerProfile.name}
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <span>{ownerProfile.age} лет</span>
                    <span>•</span>
                    <Icon name="MapPin" size={14} className="inline" />
                    <span>{ownerProfile.location}</span>
                  </p>
                </div>

                <p className="text-base leading-relaxed">{ownerProfile.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">{ownerProfile.posts}</span>
                    <span className="text-muted-foreground">постов</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-bold text-xl">{ownerProfile.followers}</span>
                    <span className="text-muted-foreground">подписчиков</span>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                    <span className="font-bold text-xl">{ownerProfile.following}</span>
                    <span className="text-muted-foreground">подписок</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl text-primary">{unlockedAchievements.length}</span>
                    <span className="text-muted-foreground">достижений</span>
                  </div>
                </div>
                
                <Card className="border-2 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-bold text-sm">
                          {userLevel}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Уровень {userLevel}</p>
                          <p className="text-xs text-muted-foreground">{totalPoints} очков опыта</p>
                        </div>
                      </div>
                      <Badge className="gap-1 text-xs">
                        <Icon name="TrendingUp" size={12} />
                        {xpProgress}%
                      </Badge>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      {userXP} / {xpForNextLevel} до следующего уровня
                    </p>
                  </CardContent>
                </Card>

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
                  <Button 
                    variant="outline" 
                    className="gap-2 hover:scale-105 transition-transform"
                    onClick={() => navigate('/messages')}
                  >
                    <Icon name="MessageCircle" size={16} />
                    Сообщение
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pets" className="gap-2">
              <Icon name="PawPrint" size={16} />
              Питомцы
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Icon name="Trophy" size={16} />
              Достижения
              <Badge className="ml-1">{unlockedAchievements.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="gap-2">
              <Icon name="Heart" size={16} />
              Спонсоры
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Достижения
                </CardTitle>
                <CardDescription>
                  Разблокировано {unlockedAchievements.length} из {mockAchievements.length} достижений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(mockAchievements.reduce((acc, achievement) => {
                  if (!acc[achievement.category]) acc[achievement.category] = [];
                  acc[achievement.category].push(achievement);
                  return acc;
                }, {} as Record<string, typeof mockAchievements>)).map(([category, achievements]) => (
                  <div key={category}>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Star" size={18} className="text-primary" />
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {achievements.map(achievement => (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            achievement.unlocked
                              ? `${getRarityColor(achievement.rarity)} hover:scale-105 cursor-pointer shadow-md`
                              : 'bg-muted/50 border-muted grayscale opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`text-3xl ${achievement.unlocked ? '' : 'filter grayscale'}`}>
                              {achievement.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="font-semibold text-sm leading-tight">
                                  {achievement.title}
                                </h5>
                                <Badge variant="outline" className="text-xs whitespace-nowrap">
                                  {achievement.points} XP
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {achievement.description}
                              </p>
                              
                              {!achievement.unlocked && achievement.progress > 0 && (
                                <div className="mt-2 space-y-1">
                                  <Progress value={achievement.progress} className="h-1.5" />
                                  <p className="text-xs text-muted-foreground">
                                    Прогресс: {achievement.progress}%
                                  </p>
                                </div>
                              )}
                              
                              {achievement.unlocked && achievement.unlockedAt && (
                                <div className="flex items-center gap-1 mt-2">
                                  <Icon name="CheckCircle" size={12} className="text-green-600" />
                                  <p className="text-xs text-green-600 font-medium">
                                    Получено {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
                                  </p>
                                </div>
                              )}
                              
                              <div className="mt-2">
                                <Badge variant="outline" className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                                  {getRarityName(achievement.rarity)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sponsors">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  Топ спонсоров
                </CardTitle>
                <CardDescription>
                  Благодарим за финансовую поддержку!
                </CardDescription>
              </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topSupporters.map((supporter, index) => (
                <div
                  key={supporter.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all cursor-pointer group"
                  onClick={() => navigate('/profile')}
                >
                  <div className="relative">
                    <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                      {index + 1}
                    </div>
                    <Avatar className="w-14 h-14 ring-2 ring-primary/20 group-hover:ring-primary transition-all">
                      <AvatarImage src={supporter.avatar} />
                      <AvatarFallback>{supporter.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-semibold text-base group-hover:text-primary transition-colors">
                      {supporter.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{supporter.date}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={16} className="text-primary fill-primary" />
                      <span className="font-bold text-lg text-primary">
                        {supporter.amount.toLocaleString()} ₽
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs mt-1">
                      Спонсор
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Всего собрано:</span>
                <span className="font-bold text-lg text-primary">
                  {topSupporters.reduce((sum, s) => sum + s.amount, 0).toLocaleString()} ₽
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="pets">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🐾</span>
                Мои питомцы
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map(pet => (
                  <Card 
                key={pet.id} 
                className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/pet/${pet.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16 ring-2 ring-primary/20">
                      <AvatarImage src={pet.avatar} />
                      <AvatarFallback className="text-2xl">{pet.emoji}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {pet.name} <span>{pet.emoji}</span>
                      </CardTitle>
                      <CardDescription>{pet.type}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} />
                    <span>{pet.age}</span>
                  </div>
                  
                  <p className="text-sm">{pet.bio}</p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {pet.photos.map((photo, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-square rounded-lg overflow-hidden hover:scale-110 transition-transform"
                      >
                        <img 
                          src={photo} 
                          alt={`${pet.name} photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;