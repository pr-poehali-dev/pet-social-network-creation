import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg'
  };

  const chats = [
    {
      id: 1,
      userId: 2,
      userName: 'Мария Смирнова',
      userAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      lastMessage: 'Спасибо за совет! Барсик теперь ест с удовольствием 😊',
      lastMessageTime: '10 мин назад',
      timestamp: Date.now() - 10 * 60 * 1000,
      unreadCount: 2,
      online: true,
      messages: [
        {
          id: 1,
          senderId: 2,
          text: 'Привет! Подскажи, пожалуйста, какой корм ты даешь своим питомцам?',
          time: '14:30',
          timestamp: Date.now() - 2 * 60 * 60 * 1000
        },
        {
          id: 2,
          senderId: 1,
          text: 'Привет! Я кормлю Royal Canin, они его очень любят 🐾',
          time: '14:35',
          timestamp: Date.now() - 115 * 60 * 1000
        },
        {
          id: 3,
          senderId: 2,
          text: 'А какой именно вид? У меня кот привередливый',
          time: '14:40',
          timestamp: Date.now() - 110 * 60 * 1000
        },
        {
          id: 4,
          senderId: 1,
          text: 'Беру для стерилизованных кошек. Попробуй, должен понравиться!',
          time: '14:42',
          timestamp: Date.now() - 108 * 60 * 1000
        },
        {
          id: 5,
          senderId: 2,
          text: 'Спасибо за совет! Барсик теперь ест с удовольствием 😊',
          time: '15:50',
          timestamp: Date.now() - 10 * 60 * 1000
        }
      ]
    },
    {
      id: 2,
      userId: 3,
      userName: 'Дмитрий Волков',
      userAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      lastMessage: 'Отлично! Завтра встречаемся в парке в 10:00',
      lastMessageTime: '1 час назад',
      timestamp: Date.now() - 60 * 60 * 1000,
      unreadCount: 0,
      online: false,
      messages: [
        {
          id: 1,
          senderId: 1,
          text: 'Привет! Не хочешь завтра сходить с собаками в парк?',
          time: '13:00',
          timestamp: Date.now() - 3 * 60 * 60 * 1000
        },
        {
          id: 2,
          senderId: 3,
          text: 'Привет! Отличная идея! Во сколько?',
          time: '13:15',
          timestamp: Date.now() - 165 * 60 * 1000
        },
        {
          id: 3,
          senderId: 1,
          text: 'В 10 утра подойдет?',
          time: '13:20',
          timestamp: Date.now() - 160 * 60 * 1000
        },
        {
          id: 4,
          senderId: 3,
          text: 'Отлично! Завтра встречаемся в парке в 10:00',
          time: '13:25',
          timestamp: Date.now() - 155 * 60 * 1000
        }
      ]
    },
    {
      id: 3,
      userId: 4,
      userName: 'Елена Коваль',
      userAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      lastMessage: 'Хорошо, буду ждать фото!',
      lastMessageTime: '2 часа назад',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
      unreadCount: 0,
      online: true,
      messages: [
        {
          id: 1,
          senderId: 4,
          text: 'Какой милый щенок у тебя! Сколько ему месяцев?',
          time: '12:00',
          timestamp: Date.now() - 4 * 60 * 60 * 1000
        },
        {
          id: 2,
          senderId: 1,
          text: 'Спасибо! Максу 6 месяцев, очень активный малыш 🐶',
          time: '12:10',
          timestamp: Date.now() - 230 * 60 * 1000
        },
        {
          id: 3,
          senderId: 4,
          text: 'Скинь еще фото, если не сложно!',
          time: '12:15',
          timestamp: Date.now() - 225 * 60 * 1000
        },
        {
          id: 4,
          senderId: 1,
          text: 'Конечно! Сейчас скину пару свежих',
          time: '12:20',
          timestamp: Date.now() - 220 * 60 * 1000
        },
        {
          id: 5,
          senderId: 4,
          text: 'Хорошо, буду ждать фото!',
          time: '12:25',
          timestamp: Date.now() - 215 * 60 * 1000
        }
      ]
    },
    {
      id: 4,
      userId: 5,
      userName: 'Олег Сидоров',
      userAvatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      lastMessage: 'Договорились!',
      lastMessageTime: 'вчера',
      timestamp: Date.now() - 24 * 60 * 60 * 1000,
      unreadCount: 0,
      online: false,
      messages: [
        {
          id: 1,
          senderId: 5,
          text: 'Привет! Ты не знаешь хорошего ветеринара?',
          time: '10:00',
          timestamp: Date.now() - 30 * 60 * 60 * 1000
        },
        {
          id: 2,
          senderId: 1,
          text: 'Да, есть отличный! Могу скинуть контакты',
          time: '10:15',
          timestamp: Date.now() - 29 * 60 * 60 * 1000
        },
        {
          id: 3,
          senderId: 5,
          text: 'Буду очень благодарен!',
          time: '10:20',
          timestamp: Date.now() - 28 * 60 * 60 * 1000
        },
        {
          id: 4,
          senderId: 1,
          text: 'Вот номер: +7 (999) 123-45-67, спроси доктора Иванова',
          time: '10:25',
          timestamp: Date.now() - 27 * 60 * 60 * 1000
        },
        {
          id: 5,
          senderId: 5,
          text: 'Договорились!',
          time: '10:30',
          timestamp: Date.now() - 26 * 60 * 60 * 1000
        }
      ]
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} />
              <span>Назад</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="text-2xl animate-bounce-slow">💬</div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Сообщения
              </h1>
            </div>

            <Button variant="ghost" size="sm">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-140px)]">
          {/* Список чатов */}
          <Card className="lg:col-span-4 border-2 shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={20} />
                Чаты
                {chats.filter(c => c.unreadCount > 0).length > 0 && (
                  <Badge className="ml-auto">
                    {chats.filter(c => c.unreadCount > 0).length}
                  </Badge>
                )}
              </CardTitle>
              <div className="relative mt-3">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск контактов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto flex-1">
              <div className="divide-y">
                {filteredChats.map(chat => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer transition-all hover:bg-muted ${
                      selectedChat === chat.id ? 'bg-primary/10 border-l-4 border-primary' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex gap-3">
                      <div className="relative">
                        <Avatar className="ring-2 ring-background">
                          <AvatarImage src={chat.userAvatar} />
                          <AvatarFallback>{chat.userName[0]}</AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm truncate">{chat.userName}</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {chat.lastMessageTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">
                            {chat.lastMessage}
                          </p>
                          {chat.unreadCount > 0 && (
                            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {chat.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Окно чата */}
          <Card className="lg:col-span-8 border-2 shadow-xl overflow-hidden flex flex-col">
            {selectedChatData ? (
              <>
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="ring-2 ring-primary/20 cursor-pointer" onClick={() => navigate('/profile')}>
                          <AvatarImage src={selectedChatData.userAvatar} />
                          <AvatarFallback>{selectedChatData.userName[0]}</AvatarFallback>
                        </Avatar>
                        {selectedChatData.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-base cursor-pointer hover:underline" onClick={() => navigate('/profile')}>
                          {selectedChatData.userName}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {selectedChatData.online ? (
                            <span className="text-green-600 flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              в сети
                            </span>
                          ) : (
                            'был(а) недавно'
                          )}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Phone" size={18} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Video" size={18} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={18} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedChatData.messages.map(message => {
                    const isCurrentUser = message.senderId === currentUser.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar className="w-8 h-8 ring-1 ring-border">
                          <AvatarImage src={isCurrentUser ? currentUser.avatar : selectedChatData.userAvatar} />
                          <AvatarFallback className="text-xs">
                            {isCurrentUser ? currentUser.name[0] : selectedChatData.userName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isCurrentUser
                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                : 'bg-muted rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">{message.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>

                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Paperclip" size={18} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Image" size={18} />
                    </Button>
                    <Input
                      placeholder="Написать сообщение..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="sm">
                      <Icon name="Smile" size={18} />
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="gap-1"
                    >
                      <Icon name="Send" size={16} />
                      Отправить
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <Icon name="MessageCircle" size={64} className="mb-4 opacity-20" />
                <p className="text-lg font-medium">Выберите чат для начала общения</p>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Messages;
