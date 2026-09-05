CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL
);

INSERT INTO courses (name, level)
VALUES
    ('Docker', 'Beginner'),
    ('Kubernetes', 'Intermediate'),
    ('AWS', 'Intermediate');