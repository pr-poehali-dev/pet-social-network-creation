import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalUsers: 1547,
    totalPets: 3821,
    totalPosts: 8943,
    totalPayments: 247,
    totalRevenue: 142500,
    activeUsers: 892,
    newUsersToday: 23,
    pendingReports: 5
  };

  const recentUsers = [
    {
      id: 1,
      name: 'Мария Смирнова',
      email: 'maria@example.com',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      joinDate: '2 дня назад',
      status: 'active',
      pets: 2,
      posts: 15
    },
    {
      id: 2,
      name: 'Дмитрий Волков',
      email: 'dmitry@example.com',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg',
      joinDate: '5 дней назад',
      status: 'active',
      pets: 1,
      posts: 8
    },
    {
      id: 3,
      name: 'Елена Коваль',
      email: 'elena@example.com',
      avatar: 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg',
      joinDate: '1 неделю назад',
      status: 'blocked',
      pets: 3,
      posts: 0
    }
  ];

  const recentPayments = [
    {
      id: 1,
      from: 'Мария Смирнова',
      to: 'Анна Петрова',
      amount: 5000,
      date: '2 дня назад',
      status: 'completed'
    },
    {
      id: 2,
      from: 'Дмитрий Волков',
      to: 'Анна Петрова',
      amount: 3500,
      date: '5 дней назад',
      status: 'completed'
    },
    {
      id: 3,
      from: 'Елена Коваль',
      to: 'Анна Петрова',
      amount: 2000,
      date: '1 неделю назад',
      status: 'pending'
    }
  ];

  const reportedPosts = [
    {
      id: 1,
      postId: 145,
      author: 'Анна Петрова',
      petName: 'Барсик',
      content: 'Сегодня поймал солнечного зайчика...',
      reports: 2,
      reason: 'Спам',
      date: '1 час назад'
    },
    {
      id: 2,
      postId: 298,
      author: 'Олег Сидоров',
      petName: 'Рекс',
      content: 'Прогулка в парке была...',
      reports: 5,
      reason: 'Неприемлемый контент',
      date: '3 часа назад'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={20} />
                <span>На сайт</span>
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="text-2xl">🛡️</div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Админка ПетСеть
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2 relative">
                <Icon name="Bell" size={20} />
                {stats.pendingReports > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                    {stats.pendingReports}
                  </Badge>
                )}
              </Button>
              <Avatar className="cursor-pointer ring-2 ring-primary/20">
                <AvatarImage src="https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Icon name="Users" size={16} />
                Всего пользователей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-green-600 mt-1">+{stats.newUsersToday} за сегодня</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Icon name="PawPrint" size={16} />
                Всего питомцев
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalPets.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{(stats.totalPets / stats.totalUsers).toFixed(1)} на пользователя</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Icon name="FileText" size={16} />
                Всего постов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalPosts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Активных: {stats.activeUsers}</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all bg-gradient-to-br from-yellow-500/10 to-orange-500/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Icon name="DollarSign" size={16} />
                Выручка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalRevenue.toLocaleString()} ₽</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.totalPayments} платежей</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="gap-2">
              <Icon name="Users" size={16} />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <Icon name="CreditCard" size={16} />
              Платежи
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2 relative">
              <Icon name="AlertTriangle" size={16} />
              Жалобы
              {stats.pendingReports > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
                  {stats.pendingReports}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Управление пользователями</CardTitle>
                    <CardDescription>Просмотр и модерация пользователей</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск пользователей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 ring-2 ring-border">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{user.name}</p>
                            {user.status === 'active' ? (
                              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                Активен
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs text-red-600 border-red-600">
                                Заблокирован
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span>Регистрация: {user.joinDate}</span>
                            <span>•</span>
                            <span>{user.pets} питомца</span>
                            <span>•</span>
                            <span>{user.posts} постов</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Icon name="Eye" size={14} />
                          Профиль
                        </Button>
                        {user.status === 'active' ? (
                          <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                            <Icon name="Ban" size={14} />
                            Заблокировать
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="gap-1 text-green-600 hover:text-green-700">
                            <Icon name="CheckCircle" size={14} />
                            Разблокировать
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>История платежей</CardTitle>
                <CardDescription>Все транзакции в системе</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPayments.map(payment => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon name="ArrowRight" size={16} className="text-primary" />
                          <span className="font-semibold">{payment.from}</span>
                          <Icon name="ArrowRight" size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">{payment.to}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-lg text-primary">{payment.amount.toLocaleString()} ₽</p>
                        </div>
                        {payment.status === 'completed' ? (
                          <Badge className="bg-green-600">Завершен</Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600 border-orange-600">Ожидает</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="border-2 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-red-600" />
                  Жалобы на контент
                </CardTitle>
                <CardDescription>Требуют модерации</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedPosts.map(report => (
                    <div
                      key={report.id}
                      className="p-4 rounded-lg bg-red-500/5 border-2 border-red-500/20 hover:border-red-500/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="destructive" className="text-xs">
                            {report.reports} жалоб
                          </Badge>
                          <span className="text-sm text-muted-foreground">{report.date}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Пост #{report.postId}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-semibold">{report.author}</span>
                          <span className="text-muted-foreground"> (от имени {report.petName})</span>
                        </p>
                        <p className="text-sm text-muted-foreground italic">"{report.content}"</p>
                        <div className="flex items-center gap-2">
                          <Icon name="Flag" size={14} className="text-red-600" />
                          <span className="text-sm font-medium text-red-600">{report.reason}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Icon name="Eye" size={14} />
                          Посмотреть пост
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-orange-600 hover:text-orange-700">
                          <Icon name="AlertCircle" size={14} />
                          Предупредить
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-red-600 hover:text-red-700">
                          <Icon name="Trash2" size={14} />
                          Удалить пост
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 text-green-600 hover:text-green-700">
                          <Icon name="CheckCircle" size={14} />
                          Отклонить жалобы
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Настройки платформы</CardTitle>
                <CardDescription>Конфигурация и параметры системы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="DollarSign" size={16} />
                    Платежи
                  </h3>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">Минимальная сумма поддержки</p>
                        <p className="text-xs text-muted-foreground">Минимальный донат от пользователя</p>
                      </div>
                      <Input type="number" defaultValue="100" className="w-24" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">Комиссия платформы (%)</p>
                        <p className="text-xs text-muted-foreground">Процент с каждого платежа</p>
                      </div>
                      <Input type="number" defaultValue="5" className="w-24" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="Shield" size={16} />
                    Модерация
                  </h3>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">Автомодерация постов</p>
                        <p className="text-xs text-muted-foreground">ИИ фильтр запрещенного контента</p>
                      </div>
                      <Button size="sm" variant="outline">Включено</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">Жалоб для автоблокировки</p>
                        <p className="text-xs text-muted-foreground">Количество жалоб для автоматической блокировки</p>
                      </div>
                      <Input type="number" defaultValue="10" className="w-24" />
                    </div>
                  </div>
                </div>

                <Button className="w-full gap-2">
                  <Icon name="Save" size={16} />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
