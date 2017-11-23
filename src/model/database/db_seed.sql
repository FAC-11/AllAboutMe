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
        likes_svg TEXT,
        dislikes_svg TEXT
    );


    INSERT INTO users VALUES
        (DEFAULT, 'jam', 'jam@gmail.com', '$2a$10$18rlZExmWYQMnN2nWkd69eMlA/hUDCcj7DcrI./MllCOUYcDYiwlK'),
        (DEFAULT, 'sam', 'sam@gmail.com', '$2a$10$CEicRuoB3hvCnlDx9Of/deXIiRInjoRhYuC9VKdox7n0zVXMbzJb2');

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
        null,
        null,
        '{"width":666,"height":256,"svg":"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\" ?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"666\" height=\"256\" viewBox=\"0 0 666 256\" xml:space=\"preserve\">\n<desc>Created with Fabric.js 2.0.0-beta7</desc>\n<defs>\n</defs>\n<path d=\"M 78.826875 91 Q 78.796875 91 72.796875 91 Q 66.796875 91 64.796875 95.5 Q 62.796875 100 62.796875 104 Q 62.796875 108 62.796875 112.5 Q 62.796875 117 62.796875 121 Q 62.796875 125 67.796875 128.5 Q 72.796875 132 79.796875 136 Q 86.796875 140 93.296875 143 Q 99.796875 146 104.296875 148.5 Q 108.796875 151 114.296875 151 Q 119.796875 151 124.796875 151 Q 129.796875 151 131.796875 147.5 Q 133.796875 144 135.796875 139.5 Q 137.796875 135 138.796875 132 Q 139.796875 129 139.796875 121.5 Q 139.796875 114 139.796875 109 Q 139.796875 104 136.796875 99 Q 133.796875 94 129.296875 88.5 Q 124.796875 83 120.796875 82 Q 116.796875 81 113.296875 76.5 Q 109.796875 72 104.796875 68 Q 99.796875 64 95.296875 60 Q 90.796875 56 85.796875 52 Q 80.796875 48 77.296875 45.5 Q 73.796875 43 69.796875 42.5 Q 65.796875 42 62.296875 42 Q 58.796875 42 57.796875 43 Q 56.796875 44 55.796875 47 Q 54.796875 50 53.296875 53 Q 51.796875 56 51.296875 64.5 Q 50.796875 73 48.296875 82 Q 45.796875 91 45.796875 98 Q 45.796875 105 45.796875 111.5 Q 45.796875 118 45.796875 123 Q 45.796875 128 45.796875 136 Q 45.796875 144 45.796875 148.5 Q 45.796875 153 45.796875 156.5 Q 45.796875 160 46.296875 165 Q 46.796875 170 53.296875 173 Q 59.796875 176 65.796875 178.5 Q 71.796875 181 77.296875 181 Q 82.796875 181 88.796875 182 Q 94.796875 183 99.796875 184.5 Q 104.796875 186 108.796875 186.5 Q 112.796875 187 117.796875 187.5 Q 122.796875 188 126.296875 188 Q 129.796875 188 133.296875 188 Q 136.796875 188 140.296875 188 Q 143.796875 188 146.296875 185 Q 148.796875 182 153.296875 181 L 157.826875 179.97\" style=\"stroke: rgb(0,94,122); stroke-width: 30; stroke-dasharray: none; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;\" transform=\"translate(101.81 115) translate(-101.811875, -115) \" stroke-linecap=\"round\" />\n</svg>","fieldName":"likes_svg"}'
    ),
    (
        DEFAULT,
        (SELECT id FROM users WHERE email = 'sam@gmail.com'),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    );

COMMIT;
