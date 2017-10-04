BEGIN;

    INSERT INTO users (name, email, password) VALUES
        ('jam', 'jam@gmail.com', 'password'),
        ('ben', 'affleck@gmail.com', 'password')

    INSERT INTO about_me (likes, dislikes, strengths, weaknesses, uncomfortable, safe) VALUES
        ('choccies', 'spinach', 'jam making', 'eating too much jam', 'running out of jam', 'bathing in jam'),
        ('walks at sunset on the beach')

COMMIT;
