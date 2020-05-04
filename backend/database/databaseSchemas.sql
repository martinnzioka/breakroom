CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 

CREATE TABLE employeeDetails (
    user_id BIGSERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    userPassword VARCHAR(50) UNIQUE NOT NULL,
    gender VARCHAR(7),
    jobRole VARCHAR(50),
    department VARCHAR(50),
    userAddress VARCHAR(50),
    userRole VARCHAR(13) DEFAULT 'user',
    createdOn VARCHAR(150) UNIQUE NOT NULL,
    lastLogin VARCHAR(150)
);

CREATE TABLE gifPosts (
    gif_id BIGSERIAL PRIMARY KEY,
    title TEXT DEFAULT '<No Title>',
    gifurl TEXT UNIQUE NOT NULL,
    createdon TIMESTAMP,
    createdby BIGINT,
    gifdata JSON NOT NULL
);

CREATE TABLE articlePosts (
    article_id BIGSERIAL PRIMARY KEY,
    title TEXT DEFAULT '<No Title>',
    article TEXT NOT NULL,
    createdon VARCHAR(150) UNIQUE NOT NULL,
    createdby BIGINT
);