-- Добавление тестовых данных для демонстрации

-- Администратор
INSERT INTO users (name, email, password_hash, avatar, role, status) VALUES
('Администратор', 'admin@petnet.ru', '$2b$10$xyzadmin123hash', 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg', 'admin', 'active');

-- Обычные пользователи
INSERT INTO users (name, email, password_hash, avatar, role, status) VALUES
('Мария Смирнова', 'maria@example.com', '$2b$10$xyzpassword', 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', 'user', 'active'),
('Дмитрий Волков', 'dmitry@example.com', '$2b$10$xyzpassword', 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg', 'user', 'active'),
('Елена Коваль', 'elena@example.com', '$2b$10$xyzpassword', 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', 'user', 'blocked'),
('Анна Петрова', 'anna@example.com', '$2b$10$xyzpassword', 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/bff346a2-8a44-4306-af6f-03fbdba785ec.jpg', 'user', 'active'),
('Олег Сидоров', 'oleg@example.com', '$2b$10$xyzpassword', 'https://cdn.poehali.dev/projects/77ebbbc0-cc8c-4ba3-8270-07814cb4795b/files/b7510f08-2b0a-44c3-8ff2-7655fcd87ba0.jpg', 'user', 'active');

-- Питомцы
INSERT INTO pets (user_id, name, species, breed, avatar, bio) VALUES
(2, 'Барсик', 'Кот', 'Британская короткошерстная', 'https://images.unsplash.com/photo-1574158622682-e40e69881006', 'Люблю спать и играть'),
(2, 'Мурка', 'Кошка', 'Мейн-кун', 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8', 'Королева дома'),
(3, 'Рекс', 'Собака', 'Немецкая овчарка', 'https://images.unsplash.com/photo-1568572933382-74d440642117', 'Верный друг'),
(4, 'Шарик', 'Собака', 'Хаски', 'https://images.unsplash.com/photo-1605568427561-40dd23c78f44', 'Обожаю снег'),
(4, 'Пушок', 'Кот', 'Персидский', 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d', 'Пушистый красавец'),
(4, 'Белка', 'Кролик', 'Декоративный', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308', 'Прыгучая красавица'),
(5, 'Тузик', 'Собака', 'Лабрадор', 'https://images.unsplash.com/photo-1552053831-71594a27632d', 'Самый добрый пёс');

-- Посты
INSERT INTO posts (pet_id, content, image_url, likes_count, comments_count, status) VALUES
(1, 'Сегодня поймал солнечного зайчика! Был очень быстрый 🌞', 'https://images.unsplash.com/photo-1574158622682-e40e69881006', 42, 8, 'active'),
(2, 'Королевский завтрак начат 👑', 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8', 35, 5, 'active'),
(3, 'Прогулка в парке была замечательной! #собачьяжизнь', 'https://images.unsplash.com/photo-1568572933382-74d440642117', 89, 12, 'active'),
(4, 'Снег это лучшее что есть в мире! ❄️', 'https://images.unsplash.com/photo-1605568427561-40dd23c78f44', 156, 23, 'active'),
(1, 'Тренировка прыжков на диван 🛋️', NULL, 28, 3, 'active');

-- Платежи
INSERT INTO payments (from_user_id, to_user_id, amount, status, description) VALUES
(2, 4, 5000.00, 'completed', 'Поддержка контента'),
(3, 4, 3500.00, 'completed', 'Спасибо за советы'),
(4, 4, 2000.00, 'pending', 'Донат за милые фото');

-- Жалобы
INSERT INTO reports (post_id, reporter_user_id, reason, description, status) VALUES
(1, 5, 'Спам', 'Слишком много постов за день', 'pending'),
(1, 3, 'Спам', 'Повторяющийся контент', 'pending'),
(3, 2, 'Неприемлемый контент', 'Содержит оскорбления', 'pending'),
(3, 4, 'Неприемлемый контент', 'Нарушение правил', 'pending'),
(3, 5, 'Неприемлемый контент', 'Негативный контент', 'pending');
