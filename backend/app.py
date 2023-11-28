# pip install Flask-MySQLdb
# pip install mysql-connector-python

from flask import Flask
from flask_mysqldb import MySQL
import mysql.connector
import os

app = Flask(__name__)

app.config['MYSQL_HOST'] = ''
app.config['MYSQL_USER'] = ''
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = ''

mysql = MySQL(app)

def getConnection():
    return mysql.connector.connect(
        host = app.config['MYSQL_HOST'],
        user = app.config['MYSQL_USER'],
        password = app.config['MYSQL_PASSWORD'],
        database = app.config['MYSQL_DB']
    )

def create_user(first_name, last_name, username, password):
    connection = getConnection()
    cursor = connection.cursor()
    cursor.execute(

    )
    connection.commit()
    cursor.close()
    connection.close()

def get_all_users():
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM User')
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    return users

def create_session(session_name, user_id):
    connection = getConnection()

def get_all_sessions():
    connection = getConnection()

def create_town():
    connection = getConnection()

def get_all_towns():
    connection = getConnection()

def create_stat():
    connection = getConnection()

def get_all_stats():
    connection = getConnection()

def create_character():
    connection = getConnection()

def get_all_characters():
    connection = getConnection()

def create_character_town():
    connection = getConnection()

def get_character_town(character_town_id):
    connection = getConnection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT * FROM CharacterTown WHERE CharacterTownID = %s', (character_town_id,))
    character_town = cursor.fetchone()
    cursor.close()
    connection.close()
    return character_town

def create_monster():
    connection = getConnection()

def get_all_monsters():
    connection = getConnection()

def create_player():
    connection = getConnection()

def get_all_players():
    connection = getConnection()

def create_attack():
    connection = getConnection()

def get_all_attacks():
    connection = getConnection()

def create_player_attack():
    connection = getConnection()

def get_all_player_attacks():
    connection = getConnection()

def create_monster_attack():
    connection = getConnection()

def get_all_monster_attacks():
    connection = getConnection()