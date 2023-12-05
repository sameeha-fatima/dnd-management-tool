CREATE TABLE User (
    UserID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    FirstName varchar(32),
    LastName varchar(32),
    Username varchar(32) UNIQUE,
    Password varchar(32)
);

CREATE TABLE Session (
    SessionID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    SessionName varchar(32),
    UserID int NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Town (
    TownID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    TownName varchar(32),
    SessionID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID)
);

CREATE TABLE Stat (
    StatID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    Strength int,
    Dexterity int,
    Constitution int,
    Intelligence int,
    Wisdom int,
    Charisma int
);

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

CREATE TABLE CharacterTown (
    CharacterTownID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    TownID int NOT NULL,
    CharacterID int NOT NULL,
    FOREIGN KEY (TownID) REFERENCES Town(TownID),
    FOREIGN KEY (CharacterID) REFERENCES `Character`(CharacterID)
);

CREATE TABLE Monster (
    MonsterID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    MonsterName varchar(32),
    SessionID int NOT NULL,
    StatID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID),
    FOREIGN KEY (StatID) REFERENCES Stat(StatID)
);

CREATE TABLE Player (
    PlayerID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    Class varchar(32),
    Alignment varchar(32),
    CharacterID int NOT NULL,
    FOREIGN KEY (CharacterID) REFERENCES `Character`(CharacterID)
);

CREATE TABLE Attack (
    AttackID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    AttackName varchar(32),
    Damage int,
    SessionID int NOT NULL,
    FOREIGN KEY (SessionID) REFERENCES Session(SessionID)
);

CREATE TABLE PlayerAttack (
    PlayerAttackID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    AttackID int NOT NULL,
    PlayerID int NOT NULL,
    FOREIGN KEY (AttackID) REFERENCES Attack(AttackID),
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
);

CREATE TABLE MonsterAttack (
    MonsterAttackID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    AttackID int NOT NULL,
    MonsterID int NOT NULL,
    FOREIGN KEY (AttackID) REFERENCES Attack(AttackID),
    FOREIGN KEY (MonsterID) REFERENCES Monster(MonsterID)
);

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
    ELSE:
        SET _result = 1;
    END IF;
END;
//
DELIMITER ;

-- Before deleting player, delete the rows that are associated with player
DELIMETER //
CREATE TRIGGER BeforeDeletingPlayer
BEFORE DELETE ON Player 
FOR EACH ROW
BEGIN
    DECLARE character_id INT;
    DECLARE stat_id INT;
    DECLARE attack_id INT;

    SELECT CharacterID, StatID
    INTO character_id, stat_id
    FROM Character
    WHERE PlayerID = OLD.PlayerID;

    DELETE FROM PlayerAttack
    WHERE AttackID = (SELECT AttackID FROM PlayerAttack WHERE PlayerID = player_id)

    DELETE FROM Character
    WHERE CharacterID = character_id

    DELETE FROM Stat
    WHERE StatID = stat_id
END;
//
DELIMETER ;

-- Before deleting a character, delete the rows that are associated with character
DELIMETER //
CREATE TRIGGER BeforeDeletingCharacter
BEFORE DELETE
ON Character FOR EACH ROW
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
DELIMETER ;



-- Before deleting monster, delete the rows that are associated with monster
DELIMETER //
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
DELIMETER ;



-- Before deleting Attack, delete the rows that are associated with attack
DELIMETER //
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
DELIMETER ;

-- Before deleting town, delete the rows that are associated with town
DELIMETER //
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
DELIMETER ;