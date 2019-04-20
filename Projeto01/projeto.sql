CREATE TABLE usuarios(
    nome VARCHAR(255),
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES ("Hiago", "hiagofss98@gmail.com", 19);
INSERT INTO usuarios(nome, email, idade) VALUES ("Lucas Silva", "email@teste22.com", 28);
INSERT INTO usuarios(nome, email, idade) VALUES ("Lucas", "email@teste22.com", 39);
INSERT INTO usuarios(nome, email, idade) VALUES ("Maria Clara", "maria@teste22.com", 8);

DELETE FROM usuarios;