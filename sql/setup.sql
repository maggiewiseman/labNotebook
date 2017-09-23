DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS student_reports;
DROP TABLE IF EXISTS discussions;
DROP TABLE IF EXISTS calculations;
DROP TABLE IF EXISTS data;
DROP TABLE IF EXISTS procedures;
DROP TABLE IF EXISTS materials;
DROP TABLE IF EXISTS variables;
DROP TABLE IF EXISTS hypotheses;
DROP TABLE IF EXISTS abstracts;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS titles;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS groups_students;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS user_sections;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    bio VARCHAR(300),
    role VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    teacher_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    course_id INTEGER REFERENCES courses(id),
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_sections (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    section_id INTEGER REFERENCES sections(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR (255),
    section_id INTEGER REFERENCES sections(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups_students (
    id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(id),
    student_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    section_id INTEGER REFERENCES sections(id) NOT NULL,
    group_id INTEGER REFERENCES groups(id),
    group_lab BOOLEAN NOT NULL,
    name VARCHAR(255) NOT NULL,
    instructions VARCHAR(255),
    due DATE,
    title VARCHAR(100),
    abstract VARCHAR(100),
    question VARCHAR(100),
    hypothesis VARCHAR(100),
    variables VARCHAR(100),
    materials VARCHAR(100),
    procedures VARCHAR(100),
    data VARCHAR(100),
    calculations VARCHAR(100),
    discussion VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE titles (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE abstracts (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE hypotheses (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variables (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE procedures (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE data (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE calculations (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE discussions (
    id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(id),
    group_id INTEGER REFERENCES groups(id),
    editable BOOLEAN,
    content TEXT,
    comments TEXT,
    grade VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_reports (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) NOT NULL,
    assignment_id INTEGER REFERENCES assignments(id) NOT NULL,
    group_id INTEGER REFERENCES groups(id),
    abstract_id INTEGER REFERENCES abstracts(id),
    question_id INTEGER REFERENCES questions(id),
    hypothesis_id INTEGER REFERENCES hypotheses(id),
    variables_id INTEGER REFERENCES variables(id),
    materials_id INTEGER REFERENCES materials(id),
    procedures_id INTEGER REFERENCES procedures(id),
    data_id INTEGER REFERENCES data(id),
    calculations_id INTEGER REFERENCES calculations(id),
    discussion_id INTEGER REFERENCES discussions(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    to_id INTEGER REFERENCES users(id) NOT NULL,
    from_id INTEGER REFERENCES users(id) NOT NULL,
    content TEXT NOT NULL,
    response_id INTEGER REFERENCES messages(id),
    assignment_id INTEGER REFERENCES assignments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
