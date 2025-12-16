import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const PetProfile = () => {
  const navigate = useNavigate();
  const { petId } = useParams();

  const pets = [
    {
      id: '1',
      name: 'Рекс',
      type: 'Золотистый ретривер',
      age: '3 года',
      emoji: '🐕',
      bio: 'Обожаю играть в мяч и купаться в озере! Самый дружелюбный пёс на районе 🎾',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      owner: 'Анна Петрова',
      weight: '30 кг',
      breed: 'Золотистый ретривер',
      photos: [
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      ],
      favorites: ['Мячик 🎾', 'Плавание 🏊', 'Прогулки 🌳'],
      achievements: [
        { title: 'Лучший друг', icon: '🏆', description: 'За дружелюбие' },
        { title: 'Спортсмен', icon: '⚽', description: 'За активность' },
        { title: 'Пловец', icon: '🏊', description: 'За любовь к воде' },
      ]
    },
    {
      id: '2',
      name: 'Барсик',
      type: 'Шотландская вислоухая',
      age: '2 года',
      emoji: '🐱',
      bio: 'Люблю спать на солнышке и ловить солнечных зайчиков. Мастер мурлыканья! 😺',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      owner: 'Анна Петрова',
      weight: '5 кг',
      breed: 'Шотландская вислоухая',
      photos: [
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      ],
      favorites: ['Солнечные зайчики ☀️', 'Сон 😴', 'Мурлыканье 🎵'],
      achievements: [
        { title: 'Соня', icon: '😴', description: 'За любовь ко сну' },
        { title: 'Фотогеничный', icon: '📸', description: 'За красоту' },
        { title: 'Мурлыка', icon: '🎵', description: 'За мурчание' },
      ]
    },
    {
      id: '3',
      name: 'Макс',
      type: 'Лабрадор',
      age: '6 месяцев',
      emoji: '🐶',
      bio: 'Самый энергичный щенок в округе! Обожаю всех и всё! 🚀',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      owner: 'Анна Петрова',
      weight: '15 кг',
      breed: 'Лабрадор',
      photos: [
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
        'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      ],
      favorites: ['Бегать 🏃', 'Грызть игрушки 🦴', 'Обниматься 🤗'],
      achievements: [
        { title: 'Энергичный', icon: '⚡', description: 'За активность' },
        { title: 'Щенок', icon: '🐶', description: 'За юный возраст' },
        { title: 'Дружелюбный', icon: '💛', description: 'За любовь к людям' },
      ]
    }
  ];

  const pet = pets.find(p => p.id === petId);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Питомец не найден</h2>
          <Button onClick={() => navigate('/profile')}>Вернуться к профилю</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary pb-20">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/profile')}>
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
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl ring-4 ring-primary/20">
                <AvatarImage src={pet.avatar} />
                <AvatarFallback className="text-5xl">{pet.emoji}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    {pet.name} <span className="text-4xl">{pet.emoji}</span>
                  </h2>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="secondary">{pet.breed}</Badge>
                    <span>•</span>
                    <span>{pet.age}</span>
                    <span>•</span>
                    <span>{pet.weight}</span>
                  </p>
                </div>

                <p className="text-base leading-relaxed">{pet.bio}</p>

                <div className="flex items-center gap-2 text-sm">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Хозяин:</span>
                  <button 
                    onClick={() => navigate('/profile')}
                    className="font-medium hover:underline"
                  >
                    {pet.owner}
                  </button>
                </div>

                <div className="flex gap-3">
                  <Button className="gap-2 hover:scale-105 transition-transform">
                    <Icon name="Heart" size={16} />
                    Нравится
                  </Button>
                  <Button variant="outline" className="gap-2 hover:scale-105 transition-transform">
                    <Icon name="MessageCircle" size={16} />
                    Написать
                  </Button>
                  <Button variant="outline" size="icon" className="hover:scale-105 transition-transform">
                    <Icon name="Share2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>❤️</span>
            Любимые занятия
          </h3>
          <div className="flex flex-wrap gap-2">
            {pet.favorites.map((fav, idx) => (
              <Badge key={idx} variant="secondary" className="text-base px-4 py-2">
                {fav}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Award" size={24} />
            Достижения
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pet.achievements.map((achievement, idx) => (
              <Card key={idx} className="p-4 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-bold mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Icon name="Image" size={24} />
            Фотоальбом
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pet.photos.map((photo, idx) => (
              <div 
                key={idx} 
                className="aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-md"
              >
                <img 
                  src={photo} 
                  alt={`${pet.name} фото ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default PetProfile;
