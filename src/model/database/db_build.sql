BEGIN;

    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(64) NOT NULL
    );

    DROP TABLE IF EXISTS about_me CASCADE;

    CREATE TABLE about_me (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        likes TEXT,
        dislikes TEXT,
        strengths TEXT,
        weaknesses TEXT,
        uncomfortable TEXT,
        safe TEXT
    );

    DROP TABLE IF EXISTS symptoms CASCADE;

    CREATE TABLE symptoms (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        diagnosis TEXT,
        dianosis_agreement TEXT,
        current_medication TEXT,
        therapies TEXT,
        therapies_helpful TEXT,
        keep_well TEXT
    );

    DROP TABLE IF EXISTS backgrounds CASCADE;

    CREATE TABLE backgrounds (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        background TEXT
    );

    DROP TABLE IF EXISTS appointments CASCADE;

    CREATE TABLE appointments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        worker_preferences TEXT,
        appointment_preferences TEXT,
        parent_involved BOOLEAN,
        email TEXT,
        mobile TEXT,
        telephone TEXT,
        contact_preference TEXT
    );

    DROP TABLE IF EXISTS closing CASCADE;

    CREATE TABLE closing (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        concerns TEXT,
        hope TEXT
    );

COMMIT;
