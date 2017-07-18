DROP DATABASE IF EXISTS usersdb;
CREATE DATABASE usersdb;

\c usersdb;

DROP TABLE IF EXISTS userstable;
CREATE TABLE userstable (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL
);

INSERT INTO userstable (name, password)
  VALUES ('Dongle', '12345'),
  ('Bacon', 'narwhal'),
  ('I am a human', 'robot revolution'),
  ('user4', '4444')
