BEGIN;

    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(64) NOT NULL
    );

    DROP TABLE IF EXISTS forms CASCADE;

    CREATE TABLE forms (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) UNIQUE,
        likes TEXT,
        dislikes TEXT,
        strengths TEXT,
        weaknesses TEXT,
        uncomfortable TEXT,
        safe TEXT,
        diagnosis_options TEXT,
        diagnosis_other TEXT,
        diagnosis_agreement varchar(10),
        medication TEXT,
        therapies_options TEXT,
        therapies_other TEXT,
        therapies_helpful TEXT,
        keep_well TEXT,
        background TEXT,
        gender_preference varchar(10),
        time_preference varchar(10),
        parent_involvement varchar(10),
        email varchar(100),
        mobile varchar(100),
        telephone varchar(100),
        contact_preference varchar(100),
        concerns TEXT,
        hope TEXT,
        additional_info TEXT
    );


    INSERT INTO users VALUES
        (DEFAULT, 'jam', 'jam@gmail.com', '$2a$10$18rlZExmWYQMnN2nWkd69eMlA/hUDCcj7DcrI./MllCOUYcDYiwlK');

    INSERT INTO forms VALUES
    (
        DEFAULT,
        (SELECT id FROM users WHERE email = 'jam@gmail.com'),
        'choccies',
        'rain and thunder',
        'being super duper',
        'nothing!',
        'uncertainty',
        'bathing in jam',
        '{schizophrenia,depression}',
        null,
        'no',
        'none',
        '{talking therapies}',
        null,
        null,
        'running',
        'i went for a walk when i was born',
        'male',
        'am',
        'no',
        '',
        '091290382904',
        null,
        '{text,email}',
        null
    );

COMMIT;
