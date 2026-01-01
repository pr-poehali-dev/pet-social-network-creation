import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

interface PhotoData {
  url: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

const PetProfile = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');

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

  const [photosData, setPhotosData] = useState<PhotoData[]>(
    pet?.photos.map((url, idx) => ({
      url,
      likes: Math.floor(Math.random() * 50) + 10,
      isLiked: false,
      comments: idx === 0 ? [
        { id: 1, user: 'Мария К.', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', text: 'Какой милашка! 😍', time: '2 часа назад' },
        { id: 2, user: 'Иван С.', avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg', text: 'Обожаю таких собак!', time: '5 часов назад' }
      ] : []
    })) || []
  );

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

  const handleLike = (photoIdx: number) => {
    setPhotosData(prev => prev.map((photo, idx) => 
      idx === photoIdx 
        ? { ...photo, isLiked: !photo.isLiked, likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1 }
        : photo
    ));
  };

  const handleAddComment = (photoIdx: number) => {
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: Date.now(),
      user: 'Вы',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      text: newComment,
      time: 'Только что'
    };

    setPhotosData(prev => prev.map((photo, idx) => 
      idx === photoIdx 
        ? { ...photo, comments: [...photo.comments, newCommentObj] }
        : photo
    ));
    
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary pb-20">
      <Navigation />

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
            {photosData.map((photo, idx) => (
              <div 
                key={idx} 
                className="relative group cursor-pointer"
                onClick={() => setSelectedPhoto(idx)}
              >
                <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform">
                  <img 
                    src={photo.url} 
                    alt={`${pet.name} фото ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Icon name="Heart" size={16} className={photo.isLiked ? 'fill-red-500 text-red-500' : ''} />
                    <span>{photo.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Icon name="MessageCircle" size={16} />
                    <span>{photo.comments.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <Dialog open={selectedPhoto !== null} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPhoto !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{pet.name}</span>
                  <span>{pet.emoji}</span>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={photosData[selectedPhoto].url} 
                    alt={`${pet.name} фото`}
                    className="w-full object-contain max-h-[50vh]"
                  />
                </div>

                <div className="flex items-center gap-4 pb-4 border-b">
                  <Button
                    variant={photosData[selectedPhoto].isLiked ? "default" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={() => handleLike(selectedPhoto)}
                  >
                    <Icon 
                      name="Heart" 
                      size={18} 
                      className={photosData[selectedPhoto].isLiked ? 'fill-current' : ''} 
                    />
                    <span>{photosData[selectedPhoto].likes}</span>
                  </Button>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="MessageCircle" size={18} />
                    <span>{photosData[selectedPhoto].comments.length} комментариев</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Комментарии</h4>
                  
                  {photosData[selectedPhoto].comments.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Пока нет комментариев</p>
                  ) : (
                    <div className="space-y-3">
                      {photosData[selectedPhoto].comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.avatar} />
                            <AvatarFallback>{comment.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-muted rounded-lg p-3">
                              <p className="font-semibold text-sm">{comment.user}</p>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{comment.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Input
                      placeholder="Добавить комментарий..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selectedPhoto)}
                    />
                    <Button onClick={() => handleAddComment(selectedPhoto)}>
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetProfile;