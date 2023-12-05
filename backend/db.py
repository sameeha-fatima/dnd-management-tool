import os
import mysql.connector
import hashlib
from flask_mysqldb import MySQL
from dotenv import load_dotenv

mysql = MySQL(app)
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
    cursor.execute('INSERT INTO User(FirstName, LastName, Username, Password) VALUES (%s, %s, %s, %s)', (first_name, last_name, username, hash_password))
    connection.commit()
    cursor.close()
    connection.close()
    
def get_user(user_id):
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM User WHERE UserID = %s', (user_id,))
    user = cursor.fetchone()
    cursor.close()
    connection.close()

    if user:
        return User(**user)
    else:
        return None

def get_all_users():
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM User')
    users_records = cursor.fetchall()
    users = [User(**record) for record in users_records]
    cursor.close()
    connection.close()
    return users

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
    cursor.execute('DELETE FROM Session WHERE SessionID = "%s"', (session_id,))
    connection.commit()
    cursor.close()
    connection.close()

def get_all_sessions():
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Session')
    session_records = cursor.fetchall()
    session = [Session(**record) for record in session_records]
    cursor.close()
    connection.close()
    return session

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

#####################
# STAT FUNCTIONS
#####################
def create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Stat (Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma) VALUES (%s, %s, %s, %s, %s, %s)', (strength, dexterity, constitution, intelligence, wisdom, charisma))
    connection.commit()
    cursor.close()
    connection.close()

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
    cursor.close()
    connection.close()

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

def create_character_town(town_id, character_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Character (TownID, CharacterID) VALUES (%s, %s)', (town_id, character_id))
    connection.commit()
    cursor.close()
    connection.close()

def get_character_town(character_town_id):
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM CharacterTown WHERE CharacterTownID = %s', (character_town_id,))
    character_town = cursor.fetchone()
    cursor.close()
    connection.close()

    if character_town:
        return CharacterTown(**character_town)
    else:
        return None

#####################
# MONSTER FUNCTIONS
#####################
def create_monster(monster_name, session_id, stat_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Character (MonsterName, SessionID, StatID) VALUES (%s, %s, %s)', (monster_name, session_id, stat_id))
    connection.commit()
    cursor.close()
    connection.close()

def delete_monster(monster_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM Monster WHERE MonsterID = "%s"', (monster_id,))
    connection.commit()
    cursor.close()
    connection.close()

def get_monster(monster_id):
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM Monster WHERE MonsterID = %s', (monster_id,))
    monster_town = cursor.fetchone()
    cursor.close()
    connection.close()

    if monster_town:
        return Monster(**monster_town)
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
def create_player(_class, alignment, character_id):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute('INSERT INTO Player (Class, Alignment, CharacterID) VALUES (%s, %s, %s)', (_class, alignment, character_id))
    connection.commit()
    cursor.close()
    connection.close()

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

def get_all_player_attacks():
    connection = getConnection()
    cursor.execute('SELECT * FROM PlayerAttack')
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

def get_all_monster_attacks():
    connection = getConnection()
    cursor.execute('SELECT * FROM MonsterAttack')
    monster_attack_records = cursor.fetchall()
    monster_attack = [MonsterAttack(**record) for record in monster_attack_records]
    cursor.close()
    connection.close()
    return monster_attack
