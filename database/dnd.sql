DROP DATABASE IF EXISTS dnd_tool;
CREATE DATABASE dnd_tool;
USE dnd_tool;

CREATE TABLE User (
    UserID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    FirstName varchar(32),
    LastName varchar(32),
    Username varchar(32) UNIQUE,
    Password varchar(64)
);

-- password is password
INSERT INTO User VALUES (1, 'Adam', 'Gaweda', 'theGoat23', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');
-- password is 12345678
INSERT INTO User VALUES (NULL, 'David', 'Jordan', 'bestTA', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f');

CREATE TABLE Session (
    SessionID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    SessionName varchar(32),
    UserID int NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

INSERT INTO Session VALUES (NULL, 'CSC440', '1');

CREATE TABLE Town (
    TownID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    TownName varchar(32),
    SessionID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID)
);

INSERT INTO Town VALUES (NULL, 'TheFront', '1');
INSERT INTO Town VALUES (NULL, 'BackRow', '1');
INSERT INTO Town VALUES (NULL, 'NonExistent', '1');

CREATE TABLE Stat (
    StatID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    Strength int,
    Dexterity int,
    Constitution int,
    Intelligence int,
    Wisdom int,
    Charisma int
);

INSERT INTO Stat VALUES (1, 18, 11, 7, 11, 8, 17);
INSERT INTO Stat VALUES (NULL, 18, 18, 18, 18, 18, 18);

CREATE TABLE `Character` (
    CharacterID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    CharacterName varchar(32),
    Job varchar(32),
    Race varchar(32),
    SessionID int NOT NULL,
    StatID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID),
    FOREIGN KEY (StatID) REFERENCES Stat(StatID)
);

INSERT INTO `Character` VALUES (NULL, 'Professor', 'Judge', 'Human', 1, 1);

CREATE TABLE CharacterTown (
    CharacterTownID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    TownID int NOT NULL,
    CharacterID int NOT NULL,
    FOREIGN KEY (TownID) REFERENCES Town(TownID),
    FOREIGN KEY (CharacterID) REFERENCES `Character`(CharacterID)
);

INSERT INTO CharacterTown VALUES (NULL, 1, 1);

CREATE TABLE Monster (
    MonsterID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    MonsterName varchar(32),
    SessionID int NOT NULL,
    StatID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID),
    FOREIGN KEY (StatID) REFERENCES Stat(StatID)
);

INSERT INTO Monster VALUES (NULL, 'ClassEval', 1, 2);

CREATE TABLE Player (
    PlayerID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    Class varchar(32),
    Alignment varchar(32),
    CharacterID int NOT NULL,
    FOREIGN KEY (CharacterID) REFERENCES `Character`(CharacterID)
);

INSERT INTO Player VALUES (NULL, 'Fighter', 'Chaotic Good', 1);

CREATE TABLE Attack (
    AttackID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    AttackName varchar(32),
    Damage int,
    SessionID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID)
);

INSERT INTO Attack VALUES (NULL, 'Stick Whip', 20, 1);
INSERT INTO Attack VALUES (NULL, 'Dean Meeting', 120, 1);

CREATE TABLE PlayerAttack (
    PlayerAttackID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    AttackID int NOT NULL,
    PlayerID int NOT NULL,
    FOREIGN KEY (AttackID) REFERENCES Attack(AttackID),
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
);

INSERT INTO PlayerAttack VALUES (NULL, 1, 1);

CREATE TABLE MonsterAttack (
    MonsterAttackID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    AttackID int NOT NULL,
    MonsterID int NOT NULL,
    FOREIGN KEY (AttackID) REFERENCES Attack(AttackID),
    FOREIGN KEY (MonsterID) REFERENCES Monster(MonsterID)
);

INSERT INTO MonsterAttack VALUES (NULL, 2, 1);
