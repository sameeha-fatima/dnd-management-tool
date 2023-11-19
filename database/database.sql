CREATE TABLE User (
    UserID int UNIQUE PRIMARY KEY AUTO_INCREMENT,
    FirstName varchar(32),
    LastName varchar(32),
    Username varchar(32),
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