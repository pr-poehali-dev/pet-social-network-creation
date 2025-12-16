import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const PostDetail = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'oldest'>('popular');

  const currentUser = {
    name: 'Анна Петрова',
    avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg'
  };

  const postsData = [
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
      content: 'Сегодня поймал солнечного зайчика! Лучший день в моей жизни 😸\n\nС самого утра я заметил, как солнечный луч пробивается через окно и танцует на стене. Я сразу понял - это моя добыча! Прыгал, бегал, пытался поймать его лапками. Хозяйка смеялась и снимала меня на камеру.\n\nПосле трёх часов упорной охоты я понял главное - солнечный зайчик непобедим, но это не делает его менее интересным! Завтра продолжу свою миссию 🐾',
      image: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      likes: 47,
      commentsData: [
        {
          id: 1,
          author: 'Мурка',
          authorAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
          time: '1 час назад',
          timestamp: Date.now() - 1 * 60 * 60 * 1000,
          text: 'О да! Солнечные зайчики - лучшая игра! 🌟',
          likes: 23
        },
        {
          id: 2,
          author: 'Тузик',
          authorAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
          time: '30 минут назад',
          timestamp: Date.now() - 30 * 60 * 1000,
          text: 'Я тоже люблю охотиться! Но на мячики 😄',
          likes: 15
        },
        {
          id: 3,
          author: 'Снежок',
          authorAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
          time: '15 минут назад',
          timestamp: Date.now() - 15 * 60 * 1000,
          text: 'Красавчик! Продолжай в том же духе! 💪',
          likes: 8
        },
        {
          id: 4,
          author: 'Рыжик',
          authorAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
          time: '2 часа назад',
          timestamp: Date.now() - 2 * 60 * 60 * 1000,
          text: 'Классная история! А я вчера поймал муху 🪰',
          likes: 12
        },
        {
          id: 5,
          author: 'Белла',
          authorAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
          time: '10 минут назад',
          timestamp: Date.now() - 10 * 60 * 1000,
          text: 'Это так мило! 🥰',
          likes: 5
        }
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
      image: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      likes: 89,
      commentsData: []
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
      image: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/aa0a1ae6-5792-462e-b696-bcd9fb038499.jpg',
      likes: 156,
      commentsData: []
    }
  ];

  const post = postsData.find(p => p.id === Number(postId));

  if (!post) {
    return <div>Пост не найден</div>;
  }

  const toggleCommentLike = (commentId: number) => {
    setCommentLikes(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const getSortedComments = () => {
    const comments = [...post.commentsData];
    
    switch (sortBy) {
      case 'popular':
        return comments.sort((a, b) => b.likes - a.likes);
      case 'newest':
        return comments.sort((a, b) => b.timestamp - a.timestamp);
      case 'oldest':
        return comments.sort((a, b) => a.timestamp - b.timestamp);
      default:
        return comments;
    }
  };

  const getPreviewComments = () => {
    const comments = [...post.commentsData];
    if (comments.length === 0) return [];
    if (comments.length === 1) return comments;
    if (comments.length === 2) return comments;
    
    const popular = [...comments].sort((a, b) => b.likes - a.likes)[0];
    const oldest = [...comments].sort((a, b) => a.timestamp - b.timestamp)[0];
    const newest = [...comments].sort((a, b) => b.timestamp - a.timestamp)[0];
    
    const preview = [popular];
    if (oldest.id !== popular.id) preview.push(oldest);
    if (newest.id !== popular.id && newest.id !== oldest.id && preview.length < 3) {
      preview.push(newest);
    }
    
    return preview.slice(0, 3);
  };

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
              <Icon name="Share2" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="border-2 shadow-xl animate-fade-in">
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
                      <span className={`inline-block transition-all duration-300 ${following ? 'scale-110 font-bold text-primary' : ''}`}>
                        {(post.ownerFollowers + (following ? 1 : 0)).toLocaleString()}
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
                  variant={following ? "outline" : "default"}
                  className="gap-1 hover:scale-105 transition-transform"
                  onClick={() => setFollowing(!following)}
                >
                  <Icon name={following ? "UserCheck" : "UserPlus"} size={14} />
                  <span className="hidden sm:inline">{following ? "Отписаться" : "Подписаться"}</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed whitespace-pre-line">{post.content}</p>
            </div>

            {post.image && (
              <div className="rounded-xl overflow-hidden border-2 border-border">
                <img 
                  src={post.image} 
                  alt={post.petName}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-4 pt-2 border-t">
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 hover:scale-110 transition-transform"
                onClick={() => setLiked(!liked)}
              >
                <Icon 
                  name="Heart" 
                  size={20} 
                  className={liked ? "fill-primary text-primary" : ""}
                />
                <span className={liked ? "text-primary font-semibold" : ""}>
                  {post.likes + (liked ? 1 : 0)}
                </span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Icon name="MessageCircle" size={20} />
                <span>{post.commentsData.length}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 transition-transform">
                <Icon name="Share2" size={20} />
                <span>Поделиться</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-xl animate-fade-in mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Комментарии ({post.commentsData.length})</span>
              <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as any)} className="w-auto">
                <TabsList className="grid grid-cols-3 w-auto">
                  <TabsTrigger value="popular" className="text-xs px-2 py-1">
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    Популярные
                  </TabsTrigger>
                  <TabsTrigger value="newest" className="text-xs px-2 py-1">
                    <Icon name="Clock" size={14} className="mr-1" />
                    Новые
                  </TabsTrigger>
                  <TabsTrigger value="oldest" className="text-xs px-2 py-1">
                    <Icon name="History" size={14} className="mr-1" />
                    Старые
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-primary/5 border-2 border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Info" size={16} className="text-primary" />
                <span className="text-sm font-medium">Комментарии от имени хозяина</span>
              </div>
              <div className="flex gap-3">
                <Avatar className="ring-2 ring-primary/20">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="mb-2">
                    <span className="text-sm font-semibold">{currentUser.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">хозяин питомцев</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Написать комментарий от вашего имени..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-background border-2 border-border focus:border-primary focus:outline-none transition-all"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" disabled={!commentText.trim()}>
                      <Icon name="Send" size={14} className="mr-1" />
                      Отправить
                    </Button>
                    <Button size="sm" variant="outline">
                      <Icon name="Smile" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              {getSortedComments().map(comment => (
                <div key={comment.id} className="flex gap-3 group">
                  <Avatar className="ring-1 ring-border">
                    <AvatarImage src={comment.authorAvatar} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-1 ml-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 gap-1 hover:scale-110 transition-transform"
                        onClick={() => toggleCommentLike(comment.id)}
                      >
                        <Icon
                          name="Heart"
                          size={14}
                          className={commentLikes[comment.id] ? "fill-primary text-primary" : ""}
                        />
                        <span className={`text-xs ${commentLikes[comment.id] ? "text-primary font-semibold" : ""}`}>
                          {comment.likes + (commentLikes[comment.id] ? 1 : 0)}
                        </span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                        Ответить
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {post.commentsData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-20" />
                <p>Будьте первым, кто оставит комментарий!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostDetail;