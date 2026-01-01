export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  requirementValue: number;
}

export const mockAchievements: Achievement[] = [
  {
    id: 'first_post',
    title: 'Первый пост',
    description: 'Опубликуйте свой первый пост',
    icon: '📝',
    category: 'Первые шаги',
    rarity: 'common',
    points: 10,
    unlocked: true,
    unlockedAt: '2024-01-15',
    progress: 100,
    requirementValue: 1
  },
  {
    id: 'first_like',
    title: 'Первый лайк',
    description: 'Получите первый лайк на свой пост',
    icon: '❤️',
    category: 'Первые шаги',
    rarity: 'common',
    points: 10,
    unlocked: true,
    unlockedAt: '2024-01-15',
    progress: 100,
    requirementValue: 1
  },
  {
    id: 'first_follower',
    title: 'Первый подписчик',
    description: 'Получите первого подписчика',
    icon: '👥',
    category: 'Первые шаги',
    rarity: 'common',
    points: 10,
    unlocked: true,
    unlockedAt: '2024-01-16',
    progress: 100,
    requirementValue: 1
  },
  {
    id: 'active_week',
    title: 'Активная неделя',
    description: 'Посещайте сайт 7 дней подряд',
    icon: '🔥',
    category: 'Активность',
    rarity: 'uncommon',
    points: 25,
    unlocked: true,
    unlockedAt: '2024-01-22',
    progress: 100,
    requirementValue: 7
  },
  {
    id: 'active_month',
    title: 'Активный месяц',
    description: 'Посещайте сайт 30 дней подряд',
    icon: '🌟',
    category: 'Активность',
    rarity: 'rare',
    points: 100,
    unlocked: false,
    progress: 65,
    requirementValue: 30
  },
  {
    id: 'popular_10',
    title: 'Популярный новичок',
    description: 'Наберите 10 подписчиков',
    icon: '⭐',
    category: 'Популярность',
    rarity: 'common',
    points: 20,
    unlocked: true,
    unlockedAt: '2024-01-20',
    progress: 100,
    requirementValue: 10
  },
  {
    id: 'popular_50',
    title: 'Растущая звезда',
    description: 'Наберите 50 подписчиков',
    icon: '🌠',
    category: 'Популярность',
    rarity: 'uncommon',
    points: 50,
    unlocked: true,
    unlockedAt: '2024-02-10',
    progress: 100,
    requirementValue: 50
  },
  {
    id: 'popular_100',
    title: 'Звезда соцсети',
    description: 'Наберите 100 подписчиков',
    icon: '💫',
    category: 'Популярность',
    rarity: 'rare',
    points: 100,
    unlocked: false,
    progress: 78,
    requirementValue: 100
  },
  {
    id: 'popular_500',
    title: 'Знаменитость',
    description: 'Наберите 500 подписчиков',
    icon: '🌟',
    category: 'Популярность',
    rarity: 'epic',
    points: 250,
    unlocked: false,
    progress: 15,
    requirementValue: 500
  },
  {
    id: 'viral_post',
    title: 'Вирусный пост',
    description: 'Получите 100 лайков на один пост',
    icon: '🔥',
    category: 'Популярность',
    rarity: 'rare',
    points: 75,
    unlocked: false,
    progress: 47,
    requirementValue: 100
  },
  {
    id: 'blogger_10',
    title: 'Начинающий блогер',
    description: 'Опубликуйте 10 постов',
    icon: '📱',
    category: 'Контент',
    rarity: 'common',
    points: 30,
    unlocked: true,
    unlockedAt: '2024-01-25',
    progress: 100,
    requirementValue: 10
  },
  {
    id: 'blogger_50',
    title: 'Опытный блогер',
    description: 'Опубликуйте 50 постов',
    icon: '📸',
    category: 'Контент',
    rarity: 'uncommon',
    points: 75,
    unlocked: false,
    progress: 62,
    requirementValue: 50
  },
  {
    id: 'blogger_100',
    title: 'Профессиональный блогер',
    description: 'Опубликуйте 100 постов',
    icon: '🎥',
    category: 'Контент',
    rarity: 'rare',
    points: 150,
    unlocked: false,
    progress: 31,
    requirementValue: 100
  },
  {
    id: 'commentator',
    title: 'Комментатор',
    description: 'Оставьте 50 комментариев',
    icon: '💭',
    category: 'Взаимодействие',
    rarity: 'uncommon',
    points: 40,
    unlocked: false,
    progress: 44,
    requirementValue: 50
  },
  {
    id: 'supporter',
    title: 'Поддерживающий',
    description: 'Поставьте 100 лайков',
    icon: '👍',
    category: 'Взаимодействие',
    rarity: 'uncommon',
    points: 30,
    unlocked: true,
    unlockedAt: '2024-02-01',
    progress: 100,
    requirementValue: 100
  },
  {
    id: 'challenger',
    title: 'Участник челленджа',
    description: 'Примите участие в челлендже',
    icon: '🏁',
    category: 'Челленджи',
    rarity: 'common',
    points: 20,
    unlocked: false,
    progress: 0,
    requirementValue: 1
  },
  {
    id: 'winner',
    title: 'Победитель',
    description: 'Займите 1 место в челлендже',
    icon: '🏆',
    category: 'Челленджи',
    rarity: 'epic',
    points: 200,
    unlocked: false,
    progress: 0,
    requirementValue: 1
  },
  {
    id: 'donator',
    title: 'Щедрый',
    description: 'Поддержите другого пользователя донатом',
    icon: '💰',
    category: 'Особые',
    rarity: 'rare',
    points: 75,
    unlocked: false,
    progress: 0,
    requirementValue: 1
  },
  {
    id: 'pet_lover',
    title: 'Любитель питомцев',
    description: 'Добавьте 5 питомцев в профиль',
    icon: '🐾',
    category: 'Особые',
    rarity: 'uncommon',
    points: 35,
    unlocked: false,
    progress: 60,
    requirementValue: 5
  },
  {
    id: 'beta_tester',
    title: 'Бета-тестер',
    description: 'Зарегистрируйтесь в первый месяц запуска',
    icon: '🚀',
    category: 'Особые',
    rarity: 'legendary',
    points: 500,
    unlocked: true,
    unlockedAt: '2024-01-01',
    progress: 100,
    requirementValue: 1
  }
];

export const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'text-gray-600 border-gray-400 bg-gray-50 dark:bg-gray-900';
    case 'uncommon': return 'text-green-600 border-green-400 bg-green-50 dark:bg-green-900/20';
    case 'rare': return 'text-blue-600 border-blue-400 bg-blue-50 dark:bg-blue-900/20';
    case 'epic': return 'text-purple-600 border-purple-400 bg-purple-50 dark:bg-purple-900/20';
    case 'legendary': return 'text-yellow-600 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
  }
};

export const getRarityName = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'Обычное';
    case 'uncommon': return 'Необычное';
    case 'rare': return 'Редкое';
    case 'epic': return 'Эпическое';
    case 'legendary': return 'Легендарное';
  }
};
