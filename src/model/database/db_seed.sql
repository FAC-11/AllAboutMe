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
        user_id INTEGER REFERENCES users(id),
        diagnosis TEXT,
        diagnosis_agreement TEXT,
        current_medication TEXT,
        therapies TEXT,
        therapies_helpful TEXT,
        keep_well TEXT
    );

    DROP TABLE IF EXISTS backgrounds CASCADE;

    CREATE TABLE backgrounds (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        background TEXT
    );

    DROP TABLE IF EXISTS appointments CASCADE;

    CREATE TABLE appointments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
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
        user_id INTEGER REFERENCES users(id),
        concerns TEXT,
        hope TEXT
    );

    INSERT INTO users (name, email, password) VALUES
        ('jam', 'jam@gmail.com', 'password'),
        ('ben', 'affleck@gmail.com', 'password');

    INSERT INTO about_me (user_id, likes, dislikes, strengths, weaknesses, uncomfortable, safe) VALUES
        ((SELECT id FROM users WHERE email = 'jam@gmail.com'), 'choccies', 'spinach', 'jam making', 'eating too much jam', 'running out of jam', 'bathing in jam'),
        ((SELECT id FROM users WHERE email = 'affleck@gmail.com'), 'walks at sunset on the beach', NULL, NULL, NULL, NULL, NULL);

    INSERT INTO symptoms (user_id, diagnosis, diagnosis_agreement, current_medication, therapies, therapies_helpful, keep_well) VALUES
        ((SELECT id FROM users WHERE email = 'jam@gmail.com'), 'not sure', 'yes i guess so', 'im not sure', 'i see a therapist', 'not really', 'running');

    INSERT INTO backgrounds (user_id, background) VALUES
        ((SELECT id FROM users WHERE email = 'jam@gmail.com'), 'i went for a walk and ate a sandwich and that was good.');

    INSERT INTO appointments (user_id, worker_preferences, appointment_preferences, parent_involved, email, mobile, telephone, contact_preference) VALUES
        ((SELECT id FROM users WHERE email = 'jam@gmail.com'), 'male', 'dont mind', false, 'you already have it', '123456789', '1234567891011', 'text message');

    INSERT INTO closing (user_id, concerns, hope) VALUES
        ((SELECT id FROM users WHERE email = 'jam@gmail.com'), 'i dont have any', 'i hope i get better');

COMMIT;
