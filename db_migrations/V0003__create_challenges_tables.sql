-- Таблица челленджей
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500),
    prize VARCHAR(255),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица участий в челленджах
CREATE TABLE challenge_entries (
    id SERIAL PRIMARY KEY,
    challenge_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    pet_id INTEGER NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    votes_count INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица голосов
CREATE TABLE challenge_votes (
    id SERIAL PRIMARY KEY,
    entry_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(entry_id, user_id)
);

-- Индексы
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_challenges_dates ON challenges(start_date, end_date);
CREATE INDEX idx_entries_challenge ON challenge_entries(challenge_id);
CREATE INDEX idx_entries_user ON challenge_entries(user_id);
CREATE INDEX idx_entries_status ON challenge_entries(status);
CREATE INDEX idx_votes_entry ON challenge_votes(entry_id);
CREATE INDEX idx_votes_user ON challenge_votes(user_id);
