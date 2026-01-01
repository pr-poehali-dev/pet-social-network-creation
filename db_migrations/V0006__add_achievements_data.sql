-- Достижения категории "Первые шаги"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('first_post', 'Первый пост', 'Опубликуйте свой первый пост', '📝', 'getting_started', 'common', 10, 'posts_count', 1),
('first_like', 'Первый лайк', 'Получите первый лайк на свой пост', '❤️', 'getting_started', 'common', 10, 'likes_received', 1),
('first_comment', 'Первый комментарий', 'Получите первый комментарий', '💬', 'getting_started', 'common', 10, 'comments_received', 1),
('first_follower', 'Первый подписчик', 'Получите первого подписчика', '👥', 'getting_started', 'common', 10, 'followers_count', 1),
('profile_complete', 'Полный профиль', 'Заполните все поля профиля', '✅', 'getting_started', 'common', 15, 'profile_complete', 1);

-- Достижения категории "Активность"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('active_week', 'Активная неделя', 'Посещайте сайт 7 дней подряд', '🔥', 'activity', 'uncommon', 25, 'streak_days', 7),
('active_month', 'Активный месяц', 'Посещайте сайт 30 дней подряд', '🌟', 'activity', 'rare', 100, 'streak_days', 30),
('early_bird', 'Ранняя птичка', 'Опубликуйте пост до 8:00 утра', '🌅', 'activity', 'uncommon', 20, 'early_post', 1),
('night_owl', 'Ночная сова', 'Опубликуйте пост после 23:00', '🦉', 'activity', 'uncommon', 20, 'night_post', 1);

-- Достижения категории "Популярность"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('popular_10', 'Популярный новичок', 'Наберите 10 подписчиков', '⭐', 'popularity', 'common', 20, 'followers_count', 10),
('popular_50', 'Растущая звезда', 'Наберите 50 подписчиков', '🌠', 'popularity', 'uncommon', 50, 'followers_count', 50),
('popular_100', 'Звезда соцсети', 'Наберите 100 подписчиков', '💫', 'popularity', 'rare', 100, 'followers_count', 100),
('popular_500', 'Знаменитость', 'Наберите 500 подписчиков', '🌟', 'popularity', 'epic', 250, 'followers_count', 500),
('viral_post', 'Вирусный пост', 'Получите 100 лайков на один пост', '🔥', 'popularity', 'rare', 75, 'post_likes', 100);

-- Достижения категории "Контент"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('blogger_10', 'Начинающий блогер', 'Опубликуйте 10 постов', '📱', 'content', 'common', 30, 'posts_count', 10),
('blogger_50', 'Опытный блогер', 'Опубликуйте 50 постов', '📸', 'content', 'uncommon', 75, 'posts_count', 50),
('blogger_100', 'Профессиональный блогер', 'Опубликуйте 100 постов', '🎥', 'content', 'rare', 150, 'posts_count', 100),
('story_teller', 'Рассказчик историй', 'Опубликуйте пост длиннее 500 символов', '📖', 'content', 'uncommon', 25, 'long_post', 1);

-- Достижения категории "Взаимодействие"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('commentator', 'Комментатор', 'Оставьте 50 комментариев', '💭', 'engagement', 'uncommon', 40, 'comments_given', 50),
('supporter', 'Поддерживающий', 'Поставьте 100 лайков', '👍', 'engagement', 'uncommon', 30, 'likes_given', 100),
('helpful', 'Помощник', 'Получите 50 лайков на комментарии', '🤝', 'engagement', 'rare', 60, 'comment_likes', 50),
('friendly', 'Дружелюбный', 'Подпишитесь на 20 пользователей', '🫂', 'engagement', 'common', 25, 'following_count', 20);

-- Достижения категории "Челленджи"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('challenger', 'Участник челленджа', 'Примите участие в челлендже', '🏁', 'challenges', 'common', 20, 'challenge_entry', 1),
('winner', 'Победитель', 'Займите 1 место в челлендже', '🏆', 'challenges', 'epic', 200, 'challenge_win', 1),
('top3', 'Призёр', 'Займите топ-3 в челлендже', '🥉', 'challenges', 'rare', 100, 'challenge_top3', 1),
('challenge_voter', 'Активный голосующий', 'Проголосуйте в 10 челленджах', '🗳️', 'challenges', 'uncommon', 30, 'challenge_votes', 10);

-- Достижения категории "Особые"
INSERT INTO achievements (code, title, description, icon, category, rarity, points, requirement_type, requirement_value) VALUES
('beta_tester', 'Бета-тестер', 'Зарегистрируйтесь в первый месяц запуска', '🚀', 'special', 'legendary', 500, 'early_user', 1),
('donator', 'Щедрый', 'Поддержите другого пользователя донатом', '💰', 'special', 'rare', 75, 'donation_sent', 1),
('generous', 'Благотворитель', 'Поддержите 10 пользователей', '💝', 'special', 'epic', 150, 'donations_sent', 10),
('pet_lover', 'Любитель питомцев', 'Добавьте 5 питомцев в профиль', '🐾', 'special', 'uncommon', 35, 'pets_count', 5);

-- Инициализация статистики для существующих пользователей
INSERT INTO user_stats (user_id, level, experience_points)
SELECT id, 1, 0 FROM users
ON CONFLICT (user_id) DO NOTHING;