const pool = require('./db')

const createTables = async () => {
    const query = `

        CREATE EXTENSION IF NOT EXISTS pg_trgm;

        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        nickname VARCHAR(10) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        dob VARCHAR(255),
        gender CHAR(1) NOT NULL,
        status VARCHAR(255),
        description VARCHAR(2047),
        online BOOLEAN DEFAULT FALSE
        );

        CREATE INDEX IF NOT EXISTS idx_users_nickname ON users USING gin (nickname gin_trgm_ops);

        CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        photo_link VARCHAR(255) DEFAULT '/photos/1739101625506-btx4ff.png',
        date TIMESTAMP,
        comment VARCHAR(40),
        user_id INT REFERENCES users(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS refresh_token_info(
        id UUID PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL
        );
        CREATE TABLE IF NOT EXISTS chat_room (
        id SERIAL PRIMARY KEY
        );
        CREATE TABLE IF NOT EXISTS chat_members (
        chat_room_id INT REFERENCES chat_room(id),
        user_id INT NOT NULL,
        PRIMARY KEY (chat_room_id, user_id)
        );
        CREATE TABLE IF NOT EXISTS chat_room_messages (
        id SERIAL PRIMARY KEY,
        chat_room_id INT REFERENCES chat_room(id),
        user_id INT NOT NULL,
        message VARCHAR(511),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS api_keys (
        id SERIAL PRIMARY KEY,
        api_key VARCHAR(255) NOT NULL UNIQUE,
        error_message_timestamp TIMESTAMP DEFAULT NULL,
        used_today BOOLEAN DEFAULT FALSE
        );
    `
    try {
        const client = await pool.connect()
        await client.query(query)
    } catch (e) {
        console.log(e);
    }
}

module.exports = { createTables }