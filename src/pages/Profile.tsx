import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🐾</span>
            Мои питомцы
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(pet => (
              <Card key={pet.id} className="overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
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
      </main>
    </div>
  );
};

export default Profile;