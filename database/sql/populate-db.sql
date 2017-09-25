INSERT INTO users (first_name, last_name, email, password, role) VALUES ('Maggie', 'Wiseman', 'm@m', 'maggiepass', 'teacher');

INSERT INTO users (first_name, last_name, email, password, role) VALUES ('Ingrid', 'Majdalani', 'i@i', 'ingridpass', 'student');

INSERT INTO users (first_name, last_name, email, password, role) VALUES ('Rebecca', 'Krummel', 'r@r', 'rebeccapass', 'student');

INSERT INTO courses (name, teacher_id) VALUES ('Chemistry 2017', 1);

INSERT INTO sections (name, course_id ) VALUES ('1st Period', 1);

INSERT INTO sections (name, course_id ) VALUES ('2nd Period', 1);

INSERT INTO users_sections (user_id, section_id) VALUES (2, 1);

INSERT INTO users_sections (user_id, section_id) VALUES (3, 1);

INSERT INTO assignments (section_id, group_lab, name, instructions, title, abstract, question, hypothesis, variables, materials, procedures, data, calculations, discussion) VALUES (1, FALSE, 'Rutherford Lab', 'https://www.dropbox.com/s/nsd1xcine2zzvdm/Lab_Rutherford.pdf', 'individual', 'individual','individual','individual','individual','individual','individual','individual','individual','individual');

INSERT INTO assignments (section_id, group_lab, name, instructions, title, abstract, question, hypothesis, variables, materials, procedures, data, calculations, discussion) VALUES (1, FALSE, 'Volume of Sugar Molecule', 'https://www.dropbox.com/s/o7kkoofi0zbpoq0/Lab_FindVolumeofMoleculeofSugar.pdf', 'individual', 'individual','individual','individual','individual','individual','individual','individual','individual','individual');

INSERT INTO titles (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO questions (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO abstracts (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO hypotheses (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO variables (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO materials (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO procedures (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO data (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO calculations (assignment_id, editable) VALUES (1, TRUE);
INSERT INTO discussions (assignment_id, editable) VALUES (1, TRUE);

INSERT INTO titles (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO questions (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO abstracts (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO hypotheses (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO variables (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO materials (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO procedures (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO data (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO calculations (assignment_id, editable) VALUES (2, TRUE);
INSERT INTO discussions (assignment_id, editable) VALUES (2, TRUE);
