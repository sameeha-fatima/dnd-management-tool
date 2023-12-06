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
    SessionName varchar(32) UNIQUE,
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

-- Check if username already exists before creating a user
DELIMITER //
CREATE PROCEDURE UsernameExists(
    IN _user_name varchar(32),
    OUT _result INT
)
BEGIN
    DECLARE existing_count INT;
    SELECT COUNT(*) INTO existing_count
    FROM User
    WHERE Username = _user_name;

    IF existing_count > 0 THEN
        SET _result = 0;
    ELSE
        SET _result = 1;
    END IF;
END;
//
DELIMITER ;

--Check if session name already exists, if it does, do not create session
DELIMITER //
CREATE PROCEDURE CreateSession(
    IN _session_id INT,
    IN _session_name varchar(32),
    IN _user_id INT,
    OUT _result INT
)
BEGIN
    DECLARE _duplicate_name BOOLEAN DEFAULT FALSE;
    SELECT TRUE INTO _duplicate_name
    FROM Session
    WHERE SessionName = _session_name AND UserID = _user_id;

    IF _duplicate_name THEN
        SET _result = 0;
    ELSE
        SET _result = 1;
    END IF;
END; 
//
DELIMITER ;

-- Before deleting player, delete the rows that are associated with player
DELIMITER //
CREATE TRIGGER BeforeDeletingPlayer
BEFORE DELETE ON Player 
FOR EACH ROW
BEGIN
    DECLARE character_id INT;
    DECLARE stat_id INT;
    DECLARE attack_id INT;

    SELECT CharacterID, StatID
    INTO character_id, stat_id
    FROM `Character`
    WHERE PlayerID = OLD.PlayerID;

    DELETE FROM PlayerAttack
    WHERE AttackID = (SELECT AttackID FROM PlayerAttack WHERE PlayerID = player_id);

    DELETE FROM `Character`
    WHERE CharacterID = character_id;

    DELETE FROM Stat
    WHERE StatID = stat_id;
END;
//
DELIMITER ;

-- Before deleting a character, delete the rows that are associated with character
DELIMITER //
CREATE TRIGGER BeforeDeletingCharacter
BEFORE DELETE ON `Character` FOR EACH ROW
BEGIN
    DECLARE stat_id INT;

    SELECT StatID
    INTO stat_id
    FROM Stat
    Where StatID = OLD.StatID;

    DELETE FROM Stat
    WHERE StatID = stat_id;
END; 
//
DELIMITER ;

-- Before deleting a session, delete everything associated with the session
DELIMITER //
CREATE TRIGGER BeforeDeletingSession
BEFORE DELETE ON Session 
FOR EACH ROW
BEGIN
    DECLARE character_id INT;
    DECLARE char_stat_id INT;
    DECLARE monster_stat_id INT;
    DECLARE player_stat_id INT;
    DECLARE attack_id INT;
    DECLARE town_id INT;
    DECLARE player_id INT;
    DECLARE monster_id INT;

    SELECT TownID INTO town_id
    FROM Town;

    SELECT MonsterID, StatID
    INTO monster_id, monster_stat_id
    FROM Monster;

    SELECT CharacterID, StatID
    INTO character_id, char_stat_id
    FROM `Character`;

    SELECT PlayerID, StatID
    INTO player_id, player_stat_id
    FROM Player;

    SELECT AttackID
    INTO attack_id
    FROM Attack;

    DELETE FROM MonsterAttack
    WHERE AttackID = attack_id;

    DELETE FROM PlayerAttack
    WHERE AttackID = attack_id;

    DELETE FROM Attack
    WHERE AttackID = attack_id;

    DELETE FROM CharacterTown
    WHERE TownID = town_id;

    DELETE FROM Town
    WHERE TownID = town_id;

    DELETE FROM `Character`
    WHERE CharacterID = character_id;

    DELETE FROM Stat
    WHERE StatID = char_stat_id;

    DELETE FROM Monster
    WHERE MonsterID = monster_id;

    DELETE FROM Stat
    WHERE StatID = monster_stat_id;

    DELETE FROM Player
    WHERE PlayerID = player_id;

    DELETE FROM Stat
    WHERE StatID = player_stat_id;

END;
//
DELIMITER ;

-- Before Deleting Town, delete the character towns
DELIMITER //
CREATE TRIGGER BeforeDeletingTown
BEFORE DELETE ON Town 
FOR EACH ROW
BEGIN

    DECLARE town_id INT;

    SELECT TownID INTO town_id
    FROM Town
    WHERE TownID = OLD.TownID;

    DELETE FROM CharacterTown
    WHERE TownID = town_id;

END;
//
DELIMITER ;

--Before deleting monsters, delete everything tied to the monster
DELIMITER //
CREATE TRIGGER BeforeDeletingMonster
BEFORE DELETE ON Monster 
FOR EACH ROW
BEGIN
    DECLARE monster_id INT;
    DECLARE stat_id INT;
    DECLARE monster_attack_id INT;

    SELECT MonsterID, StatID
    INTO monster_id, stat_id
    FROM Monster
    WHERE MonsterID = OLD.MonsterID;

    DELETE FROM MonsterAttack
    WHERE AttackID = (SELECT AttackID FROM MonsterAttack WHERE MonsterID = monster_id);

    DELETE FROM Stat
    WHERE StatID = stat_id;
END;
//
DELIMITER ;

--Before deleting an attack, remove related player/monster attacks
DELIMITER //
CREATE TRIGGER BeforeDeletingAttack
BEFORE DELETE ON Attack 
FOR EACH ROW
BEGIN
    DECLARE attack_id INT;

    SELECT AttackID
    INTO attack_id
    FROM Attack
    WHERE AttackID = OLD.AttackID;

    DELETE FROM MonsterAttack
    WHERE AttackID = attack_id;

    DELETE FROM PlayerAttack
    WHERE AttackID = attack_id;

END;
//
DELIMITER ;