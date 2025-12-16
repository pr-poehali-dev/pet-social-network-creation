import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [following, setFollowing] = useState<Record<number, boolean>>({});
  const [selectedPet, setSelectedPet] = useState<number | null>(null);
  const [showPetSelector, setShowPetSelector] = useState(false);

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFollow = (ownerId: number) => {
    setFollowing(prev => ({ ...prev, [ownerId]: !prev[ownerId] }));
  };

  const posts = [
    {
      id: 1,
      petName: 'Барсик',
      petAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      petType: '🐱 Кот',
      ownerName: 'Анна Петрова',
      ownerAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      ownerId: 1,
      ownerFollowers: 2345,
      time: '2 часа назад',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      content: 'Сегодня поймал солнечного зайчика! Лучший день в моей жизни 😸',
      fullContent: 'Сегодня поймал солнечного зайчика! Лучший день в моей жизни 😸\n\nС самого утра я заметил, как солнечный луч пробивается через окно и танцует на стене. Я сразу понял - это моя добыча!',
      image: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      likes: 47,
      comments: 5,
      previewComments: [
        { id: 1, author: 'Мурка', text: 'О да! Солнечные зайчики - лучшая игра! 🌟', likes: 23 },
        { id: 2, author: 'Рыжик', text: 'Классная история! А я вчера поймал муху 🪰', likes: 12 },
        { id: 3, author: 'Снежок', text: 'Красавчик! Продолжай в том же духе! 💪', likes: 8 }
      ]
    },
    {
      id: 2,
      petName: 'Рекс',
      petAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      petType: '🐶 Пёс',
      ownerName: 'Анна Петрова',
      ownerAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      ownerId: 1,
      ownerFollowers: 2345,
      time: '5 часов назад',
      timestamp: Date.now() - 5 * 60 * 60 * 1000,
      content: 'Прогулка в парке была невероятной! Познакомился с тремя новыми друзьями 🦴',
      fullContent: 'Прогулка в парке была невероятной! Познакомился с тремя новыми друзьями 🦴',
      image: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      likes: 89,
      comments: 0,
      previewComments: []
    },
    {
      id: 3,
      petName: 'Макс',
      petAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      petType: '🐶 Щенок',
      ownerName: 'Анна Петрова',
      ownerAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      ownerId: 1,
      ownerFollowers: 2345,
      time: '1 день назад',
      timestamp: Date.now() - 24 * 60 * 60 * 1000,
      content: 'Мой первый день дома! Так много всего интересного 🎾',
      fullContent: 'Мой первый день дома! Так много всего интересного 🎾',
      image: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      likes: 156,
      comments: 0,
      previewComments: []
    }
  ];

  const events = [
    { id: 1, title: 'Выставка собак "Лучший друг"', date: '15 декабря', location: 'Москва', emoji: '🏆' },
    { id: 2, title: 'Встреча владельцев хаски', date: '18 декабря', location: 'Парк Горького', emoji: '🐺' },
    { id: 3, title: 'Кошачье кафе - день открытых дверей', date: '20 декабря', location: 'СПб', emoji: '☕' }
  ];

  const communities = [
    { id: 1, name: 'Любители котов', members: 12543, emoji: '🐱' },
    { id: 2, name: 'Владельцы лабрадоров', members: 8921, emoji: '🦮' },
    { id: 3, name: 'Экзотические питомцы', members: 3456, emoji: '🦎' },
    { id: 4, name: 'Дрессировка собак', members: 15678, emoji: '🎓' }
  ];

  const myPets = [
    {
      id: 1,
      name: 'Рекс',
      type: '🐕 Золотистый ретривер',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
    },
    {
      id: 2,
      name: 'Барсик',
      type: '🐱 Шотландская вислоухая',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
    },
    {
      id: 3,
      name: 'Макс',
      type: '🐶 Лабрадор',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group">
              <div className="text-3xl animate-bounce-slow">🐾</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ПетСеть
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="gap-2 hover:scale-105 transition-transform">
                <Icon name="Home" size={20} />
                <span>Главная</span>
              </Button>
              <Button variant="ghost" className="gap-2 hover:scale-105 transition-transform">
                <Icon name="MessageCircle" size={20} />
                <span>Сообщения</span>
              </Button>
              <Button variant="ghost" className="gap-2 hover:scale-105 transition-transform">
                <Icon name="Bell" size={20} />
                <span>Уведомления</span>
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 hover:scale-105 transition-transform"
                onClick={() => navigate('/login')}
              >
                <Icon name="LogIn" size={16} />
                Вход
              </Button>
              <Button size="sm" className="gap-2 hover:scale-105 transition-transform">
                <Icon name="Plus" size={16} />
                Создать пост
              </Button>
              <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary transition-all" onClick={() => navigate('/profile')}>
                <AvatarImage src="https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg" />
                <AvatarFallback>МП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-4">
            <Card className="border-2 hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">📅</span>
                  События
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {events.map(event => (
                  <div 
                    key={event.id} 
                    className="p-3 rounded-lg bg-muted hover:bg-accent transition-all cursor-pointer hover:scale-105"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">{event.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.date} • {event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">👥</span>
                  Сообщества
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {communities.map(community => (
                  <div 
                    key={community.id} 
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-all cursor-pointer hover:scale-105"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{community.emoji}</span>
                      <div>
                        <p className="text-sm font-medium">{community.name}</p>
                        <p className="text-xs text-muted-foreground">{community.members.toLocaleString()} участников</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          <section className="lg:col-span-6 space-y-4">
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5 animate-fade-in">
              <CardHeader>
                <CardTitle className="font-handwritten text-2xl text-center">
                  Чем хочешь поделиться сегодня? 🐾
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Avatar className="cursor-pointer" onClick={() => setShowPetSelector(!showPetSelector)}>
                      <AvatarImage src={selectedPet ? myPets.find(p => p.id === selectedPet)?.avatar : myPets[0].avatar} />
                      <AvatarFallback>{selectedPet ? myPets.find(p => p.id === selectedPet)?.name[0] : myPets[0].name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder={`Расскажи от имени ${selectedPet ? myPets.find(p => p.id === selectedPet)?.name : myPets[0].name}...`}
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:outline-none transition-all"
                      />
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="Image" size={16} />
                          Фото
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="Video" size={16} />
                          Видео
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Icon name="Smile" size={16} />
                          Настроение
                        </Button>
                      </div>
                    </div>
                  </div>

                  {showPetSelector && (
                    <div className="p-3 rounded-lg border-2 border-primary/20 bg-primary/5 animate-fade-in space-y-2">
                      <p className="text-sm font-medium mb-2">Выбери питомца для публикации:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {myPets.map(pet => (
                          <div
                            key={pet.id}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                              selectedPet === pet.id 
                                ? 'bg-primary text-primary-foreground ring-2 ring-primary' 
                                : 'bg-background hover:bg-muted'
                            }`}
                            onClick={() => {
                              setSelectedPet(pet.id);
                              setShowPetSelector(false);
                            }}
                          >
                            <Avatar className="ring-2 ring-background">
                              <AvatarImage src={pet.avatar} />
                              <AvatarFallback>{pet.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{pet.name}</p>
                              <p className="text-xs opacity-80">{pet.type}</p>
                            </div>
                            {selectedPet === pet.id && <Icon name="Check" size={20} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {posts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="border-2 hover:shadow-xl transition-all animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col gap-2">
                          <Avatar 
                            className="ring-2 ring-primary/20 cursor-pointer hover:scale-110 transition-transform w-12 h-12"
                            onClick={() => navigate('/profile')}
                          >
                            <AvatarImage src={post.ownerAvatar} />
                            <AvatarFallback>{post.ownerName[0]}</AvatarFallback>
                          </Avatar>
                          <Avatar 
                            className="w-8 h-8 ring-1 ring-border cursor-pointer hover:scale-110 transition-transform"
                            onClick={() => navigate(`/pet/${post.id}`)}
                            title={`От имени: ${post.petName}`}
                          >
                            <AvatarImage src={post.petAvatar} />
                            <AvatarFallback className="text-xs">{post.petName[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base flex items-center gap-2">
                            <span className="cursor-pointer hover:underline" onClick={() => navigate('/profile')}>{post.ownerName}</span>
                            <span className="flex items-center gap-0.5 transition-all text-xs text-muted-foreground font-normal">
                              <Icon name="Users" size={12} className="inline" />
                              <span className={`inline-block transition-all duration-300 ${following[post.ownerId] ? 'scale-110 font-bold text-primary' : ''}`}>
                                {(post.ownerFollowers + (following[post.ownerId] ? 1 : 0)).toLocaleString()}
                              </span>
                            </span>
                          </CardTitle>
                          <CardDescription className="text-xs mt-1 space-y-0.5">
                            <div className="flex items-center gap-1">
                              <span className="cursor-pointer hover:underline flex items-center gap-1" onClick={() => navigate(`/pet/${post.id}`)}>
                                от имени: {post.petName}
                                <Badge variant="secondary" className="text-xs">{post.petType}</Badge>
                              </span>
                            </div>
                            <div>{post.time}</div>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant={following[post.ownerId] ? "outline" : "default"}
                          className="gap-1 hover:scale-105 transition-transform"
                          onClick={() => toggleFollow(post.ownerId)}
                        >
                          <Icon name={following[post.ownerId] ? "UserCheck" : "UserPlus"} size={14} />
                          <span className="hidden sm:inline">{following[post.ownerId] ? "Отписаться" : "Подписаться"}</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreVertical" size={20} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p 
                      className="text-base leading-relaxed cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      {post.content}
                    </p>
                    <div 
                      className="rounded-xl overflow-hidden border-2 border-border cursor-pointer"
                      onClick={() => navigate(`/post/${post.id}`)}
                    >
                      <img 
                        src={post.image} 
                        alt={post.petName}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 hover:scale-110 transition-transform"
                        onClick={() => toggleLike(post.id)}
                      >
                        <Icon 
                          name={liked[post.id] ? "Heart" : "Heart"} 
                          size={20} 
                          className={liked[post.id] ? "fill-primary text-primary" : ""}
                        />
                        <span className={liked[post.id] ? "text-primary font-semibold" : ""}>
                          {post.likes + (liked[post.id] ? 1 : 0)}
                        </span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 hover:scale-110 transition-transform"
                        onClick={() => navigate(`/post/${post.id}`)}
                      >
                        <Icon name="MessageCircle" size={20} />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 transition-transform">
                        <Icon name="Share2" size={20} />
                        <span>Поделиться</span>
                      </Button>
                    </div>

                    {post.previewComments.length > 0 && (
                      <div className="space-y-2 pt-2 border-t">
                        <div className="text-xs text-muted-foreground font-medium">Комментарии:</div>
                        {post.previewComments.map((comment, idx) => (
                          <div 
                            key={comment.id} 
                            className="flex items-start gap-2 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                            onClick={() => navigate(`/post/${post.id}`)}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold">{comment.author}</span>
                                {idx === 0 && <Badge variant="secondary" className="text-xs px-1 py-0">🔥 Популярный</Badge>}
                                {idx === 1 && post.previewComments.length === 3 && <Badge variant="outline" className="text-xs px-1 py-0">⏰ Старый</Badge>}
                                {idx === 2 && <Badge variant="outline" className="text-xs px-1 py-0">⭐ Новый</Badge>}
                              </div>
                              <p className="text-xs mt-0.5">{comment.text}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Icon name="Heart" size={12} />
                              {comment.likes}
                            </div>
                          </div>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => navigate(`/post/${post.id}`)}
                        >
                          Посмотреть все комментарии ({post.comments})
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <aside className="lg:col-span-3 space-y-4">
            <Card className="border-2 hover:shadow-lg transition-shadow animate-fade-in bg-gradient-to-br from-secondary/20 to-accent/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">💡</span>
                  Советы дня
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-background border-2 border-border">
                  <p className="text-sm font-medium mb-2">🦷 Здоровье зубов</p>
                  <p className="text-xs text-muted-foreground">
                    Регулярная чистка зубов поможет избежать проблем с полостью рта у питомца
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background border-2 border-border">
                  <p className="text-sm font-medium mb-2">🏃 Активность</p>
                  <p className="text-xs text-muted-foreground">
                    Собакам нужно минимум 30 минут активных прогулок каждый день
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-background border-2 border-border">
                  <p className="text-sm font-medium mb-2">🍖 Питание</p>
                  <p className="text-xs text-muted-foreground">
                    Следите за размером порций - ожирение опасно для здоровья питомцев
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow animate-fade-in">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">🛍️</span>
                  Магазин
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted hover:bg-accent transition-all cursor-pointer hover:scale-105">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
                      🦴
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Игрушка для собак</p>
                      <p className="text-xs text-muted-foreground mt-1">от 299 ₽</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-muted hover:bg-accent transition-all cursor-pointer hover:scale-105">
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-secondary/40 flex items-center justify-center text-2xl">
                      🏠
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Домик для кошки</p>
                      <p className="text-xs text-muted-foreground mt-1">от 1990 ₽</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
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

export default Index;