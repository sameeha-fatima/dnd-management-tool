import os
import hashlib
import mysql.connector
from dotenv import load_dotenv
from classes import *

load_dotenv()

#####################
# BASIC DB CONNECTION
#####################
def getConnection():
    return mysql.connector.connect(
        host = os.getenv('MYSQL_HOST'),
        user = os.getenv('MYSQL_USER'),
        password = os.getenv('MYSQL_PASSWORD'),
        database = os.getenv('MYSQL_DB')
    )

#####################
# USER FUNCTIONS
#####################
def login(username, password):
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM User WHERE Username = %s', (username))
    user = cursor.fetchone()
    #unpack the user tuple
    (user_id, first_name, last_name, user_name, encrypted_password) = user
    hash_object = hashlib.sha256()
    # hash the input password
    hash_object.update(password.encode())
    hash_password = hash_object.hexdigest()
    cursor.close()
    connection.close()
    #check if the input password matches the saved password
    if hash_password == encrypted_password:
        #return user with userID if correct login
        return User(**user)
    else:
        #return None or an error b/c didn't sign in correctly
        return None

def create_user(first_name, last_name, username, password):
    connection = getConnection()
    cursor = connection.cursor()
    hash_object = hashlib.sha256()
    #hash the password
    hash_object.update(password.encode())
    hash_password = hash_object.hexdigest()
    cursor.execute('INSERT INTO User (FirstName, LastName, Username, Password) VALUES (%s, %s, %s, %s)', (first_name, last_name, username, hash_password))
    connection.commit()
    cursor.close()
    connection.close()
    
# def get_user(user_id):
#     connection = getConnection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM User WHERE UserID = %s', (user_id,))
#     user = cursor.fetchone()
#     cursor.close()
#     connection.close()

#     if user:
#         return User(**user)
#     else:
#         return None

# def get_all_users():
#     connection = getConnection()
#     cursor = connection.cursor(dictionary=True)
#     cursor.execute('SELECT * FROM User')
#     users_records = cursor.fetchall()
#     users = [User(**record) for record in users_records]
#     cursor.close()
#     connection.close()
#     return users

def delete_user(user_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM User WHERE UserID = %s', (user_id,))
    connection.commit()
    cursor.close()
    connection.close()

#####################
# SESSION FUNCTIONS
#####################
def create_session(session_name, user_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Session (SessionName, UserID) VALUES (%s, %s)', (session_name, user_id))
    connection.commit()
    cursor.close()
    connection.close()

def delete_session(session_id):
    connection = getConnection()
    cursor = connection.cursor()
    delete_session_trigger_sql = '''
        DELIMETER //
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
            FROM Town
            WHERE TownID = OLD.TownID;

            SELECT MonsterID, StatID
            INTO monster_id, monster_stat_id
            FROM Monster
            WHERE MonsterID = OLD.MonsterID;

            SELECT CharacterID, StatID
            INTO character_id, char_stat_id
            FROM Character
            WHERE CharacterID = OLD.CharacterID;

            SELECT PlayerID, StatID
            INTO player_id, player_stat_id
            FROM Player
            WHERE PlayerID = OLD.PlayerID;

            SELECT AttackID
            INTO attack_id
            FROM Attack
            WHERE AttackID = OLD.AttackID;

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

            DELETE FROM Character
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
        DELIMETER ;
    '''
    cursor.execute(delete_session_trigger_sql)
    cursor.execute('DELETE FROM Session WHERE SessionID = "%s"', (session_id,))
    connection.commit()
    cursor.close()
    connection.close()

def get_all_sessions(user_id):
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Session WHERE User = "%s"', (user_id))
    session_records = cursor.fetchall()
    session = [Session(**record) for record in session_records]
    cursor.close()
    connection.close()
    return session

def get_session(session_id):
    connection = getConnection()
    cursor.execute('SELECT * FROM Session WHERE SessionID = %s', (session_id,))
    session_id = cursor.fetchone()
    cursor.close()
    connection.close()

    if session_id:
        return Session(**session_id_id)
    else:
        return None

#####################
# TOWN FUNCTIONS
#####################
def create_town(town_name, session_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Town (TownName, SessionID) VALUES (%s, %s)', (town_name, session_id))
    connection.commit()
    cursor.close()
    connection.close()

def delete_town(town_id):
    connection = getConnection()
    cursor = connection.cursor()
    delete_town_trigger_sql = '''
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
    '''
    cursor.execute(delete_town_trigger_sql)
    cursor.execute('DELETE FROM Town WHERE TownID = "%s"', (town_id,))
    connection.commit()
    cursor.close()
    connection.close()

def get_all_towns():
    connection = getConnection()
    cursor.execute('SELECT * FROM Town')
    town_records = cursor.fetchall()
    town = [Town(**record) for record in town_records]
    cursor.close()
    connection.close()
    return town

def get_town_characters(town_id):
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM CharacterTown WHERE TownID = %s', (town_id))
    characters_town = cursor.fetchall()
    cursor.close()
    connection.close()

    if characters_town:
        return [Character(**get_character(record.character_id)) for record in characters_town]
    else:
        return None

#####################
# STAT FUNCTIONS
#####################
def create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Stat (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) VALUES (%s, %s, %s, %s, %s, %s)', (strength, dexterity, constitution, intelligence, wisdom, charisma))
    connection.commit()
    cursor.execute('SELECT LAST_INSERT_ID()')
    stat_id = cursor.fetchone()
    cursor.close()
    connection.close()
    return stat_id

def update_stat(stat_id, strength, dexterity, constitution, intelligence, wisdom, charisma):
    if stat_id:
        connection = getConnection()
        cursor = connection.cursor()
        cursor.execute('UPDATE Stat SET Strength=%s, Dexterity=%s, Constitution=%s, Intelligence=%s, Wisdom=%s, Charisma=%s WHERE StatID=%s',
                        (strength, dexterity, constitution, intelligence, wisdom, charisma, stat_id))
        connection.commit()
        cursor.close()
        connection.close()
    else:
        create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma)

def get_stat(stat_id):
    connection = getConnection()
    cursor.execute('SELECT * FROM Stat WHERE StatID = %s', (stat_id,))
    stat_id = cursor.fetchone()
    cursor.close()
    connection.close()

    if stat_id:
        return Stat(**stat_id)
    else:
        return None

def get_all_stats():
    connection = getConnection()
    cursor.execute('SELECT * FROM Stat')
    stat_records = cursor.fetchall()
    stat = [Stat(**record) for record in stat_records]
    cursor.close()
    connection.close()
    return stat

#####################
# CHARACTER FUNCTIONS
#####################
def create_character(character_name, job, race, session_id, stat_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Character (CharacterName, Job, Race, SessionID, StatID) VALUES (%s, %s, %s, %s, %s)', (character_name, job, race, session_id, stat_id))
    connection.commit()
    cursor.execute('SELECT LAST_INSERT_ID()')
    character_id = cursor.fetchone()
    cursor.close()
    connection.close()
    return character_id

def update_character(character_id, character_name, job, race, session_id, stat_id):
    if (character_id is not None and character_id != ''):
        connection = getConnection()
        cursor = connection.cursor()
        cursor.execute('UPDATE Character SET CharacterName=%s, Job=%s, Race=%s, SessionID=%s, StatID=%s WHERE CharacterID=%s',
                        (character_name, job, race, session_id, stat_id, character_id))
        connection.commit()
        cursor.close()
        connection.close()
    else:
        create_character(character_name, job, race, session_id, stat_id)

def get_character(character_id):
    connection = getConnection()
    cursor.execute('SELECT * FROM Character WHERE CharacterID = %s', (character_id,))
    character_id = cursor.fetchone()
    cursor.close()
    connection.close()

    if character_id:
        return Character(**character_id)
    else:
        return None

def get_all_characters():
    connection = getConnection()
    cursor.execute('SELECT * FROM Character')
    character_records = cursor.fetchall()
    character = [Character(**record) for record in character_records]
    cursor.close()
    connection.close()
    return character

def delete_character(character_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM Character WHERE CharacterID = "%s"', (character_id))
    connection.commit()
    cursor.close()
    connection.close()

def create_character_town(town_id, character_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Character (TownID, CharacterID) VALUES (%s, %s)', (town_id, character_id))
    connection.commit()
    cursor.close()
    connection.close()

#####################
# MONSTER FUNCTIONS
#####################
def create_monster(monster_name, session_id, stat_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Character (MonsterName, SessionID, StatID) VALUES (%s, %s, %s)', (monster_name, session_id, stat_id))
    connection.commit()
    cursor.execute('SELECT LAST_INSERT_ID()')
    monster_id = cursor.fetchone()
    cursor.close()
    connection.close()
    return monster_id

def delete_monster(monster_id):
    connection = getConnection()
    cursor = connection.cursor()
    delete_monster_trigger_sql = '''
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
    '''
    cursor.execute(delete_monster_trigger_sql)
    cursor.execute('DELETE FROM Monster WHERE MonsterID = "%s"', (monster_id,))
    connection.commit()
    cursor.close()
    connection.close()

def get_monster(monster_id):
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Monster WHERE MonsterID = %s', (monster_id,))
    monster = cursor.fetchone()
    cursor.close()
    connection.close()

    if monster:
        return Monster(**monster)
    else:
        return None

def get_all_monsters():
    connection = getConnection()
    cursor.execute('SELECT * FROM Monster')
    monster_records = cursor.fetchall()
    monster = [Monster(**record) for record in monster_records]
    cursor.close()
    connection.close()
    return monster

#####################
# PLAYER FUNCTIONS
#####################
def get_player(player_id):
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Player WHERE PlayerID = %s', (player_id))
    player = cursor.fetchone()
    cursor.close()
    connection.close()

    if player:
        return Player(**player)
    else:
        return None

def create_player(_class, alignment, character_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Player (Class, Alignment, CharacterID) VALUES (%s, %s, %s)', (_class, alignment, character_id))
    connection.commit()
    cursor.execute('SELECT LAST_INSERT_ID()')
    player_id = cursor.fetchone()
    cursor.close()
    connection.close()
    return player_id

def update_player(player_id, _class, alignment, character_id):
    if player_id:
        connection = getConnection()
        cursor = connection.cursor()
        cursor.execute('UPDATE Player SET Class=%s, Alignment=%s, CharacterID=%s WHERE PlayerID=%s',
                        (_class, alignment, character_id, player_id))
        connection.commit()
        cursor.close()
        connection.close()
    else:
        create_player( _class, alignment, character_id)

def get_all_players():
    connection = getConnection()
    cursor.execute('SELECT * FROM Player')
    player_records = cursor.fetchall()
    player = [Player(**record) for record in player_records]
    cursor.close()
    connection.close()
    return player

def delete_player(player_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM Player WHERE PlayerID = "%s"', (player_id))
    connection.commit()
    cursor.close()
    connection.close()

#####################
# ATTACK FUNCTIONS
#####################
def create_attack(attack_name, damage, session_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Attack (AttackName, Damage, SessionID) VALUES (%s, %s, %s)', (attack_name, damage, session_id))
    connection.commit()
    cursor.close()
    connection.close()

def update_attack(attack_id, attack_name, damage, session_id):
    if attack_id:
        connection = getConnection()
        cursor = connection.cursor()
        cursor.execute('UPDATE Attack SET AttackName=%s, Damage=%s, SessionID=%s WHERE AttackID=%s',
                        (attack_name, damage, session_id, attack_id))
        connection.commit()
        cursor.close()
        connection.close()
    else:
        create_attack(attack_name, damage, session_id)

def delete_attack(attack_id):
    connection = getConnection()
    cursor = connection.cursor()
    delete_attack_trigger_sql = '''
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
    '''
    cursor.execute(delete_attack_trigger_sql)
    cursor.execute('DELETE FROM Attack WHERE AttackID = "%s"', (attack_id,))
    connection.commit()
    cursor.close()
    connection.close()

def get_attack(attack_id):
    connection = getConnection()
    cursor.execute('SELECT * FROM Attack WHERE AttackID = %s', (attack_id,))
    attack_id = cursor.fetchone()
    cursor.close()
    connection.close()

    if attack_id:
        return Attack(**attack_id)
    else:
        return None

def get_all_attacks():
    connection = getConnection()
    cursor.execute('SELECT * FROM Attack')
    attack_records = cursor.fetchall()
    attack = [Attack(**record) for record in attack_records]
    cursor.close()
    connection.close()
    return attack

def create_player_attack(attack_id, player_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO PlayerAttack (AttackID, PlayerID) VALUES (%s, %s)', (attack_id, player_id))
    connection.commit()
    cursor.close()
    connection.close()

def get_all_player_attacks(player_id):
    connection = getConnection()
    cursor.execute('SELECT * FROM PlayerAttack WHERE PlayerID = %s', (player_id))
    player_attack_records = cursor.fetchall()
    player_attack = [PlayerAttack(**record) for record in player_attack_records]
    cursor.close()
    connection.close()
    return player_attack

def create_monster_attack(attack_id, monster_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO MonsterAttack (AttackID, MonsterID) VALUES (%s, %s)', (attack_id, monster_id))
    connection.commit()
    cursor.close()
    connection.close()

def get_all_monster_attacks(monster_id):
    connection = getConnection()
    cursor.execute('SELECT * FROM MonsterAttack WHERE MonsterID = %s', (monster_id))
    monster_attack_records = cursor.fetchall()
    monster_attack = [Attack(**get_attack(record.attack_id)) for record in monster_attack_records]
    cursor.close()
    connection.close()
    return monster_attack
