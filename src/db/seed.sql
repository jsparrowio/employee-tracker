INSERT INTO department (name)
VALUES ('Executives'),
       ('Finance'),
       ('Marketing'),
       ('Programming'),
       ('Administration');

INSERT INTO role (title, salary, department_id)
VALUES ('President and CEO', 300000.00, 1),
       ('SVP and COO', 200000.00, 1),
       ('Finance Department Head', 100000.00, 2),
       ('Marketing Department Head', 80000.00, 3),
       ('Programming Department Head', 120000.00, 4),
       ('Admin Department Head', 75000.00, 5),
       ('Accountant', 80000.00, 2),
       ('Copywriter', 75000.00, 3),
       ('Sr Developer', 100000.00, 4),
       ('Jr Developer', 80000.00, 4),
       ('Admin', 60000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Spencer', 'Alexandar', 1, null),
       ('Alan', 'Beck', 2, 1),
       ('Athena', 'Fisher', 3, 2),
       ('Stuart', 'Arias', 4, 2),
       ('Heidi', 'Holt', 5, 2),
       ('Eliot', 'Kane', 6, 2),
       ('Annabelle', 'Wyatt', 7, 3),
       ('Ewan', 'Caldwell', 7, 3),
       ('Abraham', 'Robinson', 8, 4),
       ('Leyla', 'Mcmillan', 8, 4),
       ('Ria', 'Woodard', 9, 5),
       ('Alessia', 'Gutierrez', 9, 5),
       ('Mark', 'Zamora', 10, 11),
       ('Curtis', 'Prince', 10, 12),
       ('Shirley', 'Proctor', 11, 6),
       ('Vinny', 'Hart', 11, 6);