# pip install Flask-MySQLdb
# pip install mysql-connector-python

from flask import Flask, jsonify, request
from db import *

app = Flask(__name__)

#####################
# USER FUNCTIONS
#####################
@app.route('/user', methods=['POST'])
def create_user_route():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    password = data.get('password')

    create_user(first_name, last_name, username, password)
    
    return jsonify({'message': 'User created successfully'})
  
@app.route('/user', methods=['GET'])
def get_user_route(user_id):
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username and password:
        user = login(username, password)
        if user is None:
            return jsonify({'error': 'Invalid username or password'}), 401
    else:
        return jsonify({'error': 'Username or password is missing'}), 400

    # user = get_user(user_id)
    # if user:
    #     return jsonify(vars(user))
    # else:
    #     return jsonify({'error': 'User not found'}, 404)

@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user_route():
    data = request.get_json()
    user_id = data.get('user_id')

    if user_id is not None:
        delete_user(user_id)
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'error': 'UserID is missing or incorrect'}, 400)

#####################
# SESSION FUNCTIONS
#####################
@app.route('/session', methods=['GET'])
def get_session_route():
    data = request.get_json()

    session_name = data.get('session_name')
    user_id = data.get('user_id')
    create_session(session_name, user_id)

@app.route('/session_all', methods=['GET'])
def get_all_sessions_route():
    sessions = get_all_sessions()
    return jsonify(sessions)

@app.route('/session', methods=['POST'])
def create_session_route():
    data = request.get_json()

    session_name = data.get('session_name')
    user_id = data.get('user_id')
    create_session(session_name, user_id)

    return jsonify({'message': 'Session created successfully'})

@app.route('/session', methods=['DELETE'])
def delete_session_route():
    data = request.get_json()
    session_id = data.get('session_id')

    if session_id is not None:
        delete_session(session_id)
        return jsonify({'message': 'Session deleted successfully'})
    else:
        return jsonify({'error': 'SessionID is missing or incorrect'}), 400

#####################
# TOWN FUNCTIONS
#####################
@app.route('/create_town_route', methods=['POST'])
def create_session_route():
    data = request.get_json()

    town_name = data.get('town_name')
    session_id = data.get('session_id')
    create_town(town_name, session_id)

    return jsonify({'message': 'Town created successfully'})

#####################
# STAT FUNCTIONS
#####################
@app.route('/create_stat_route', methods=['POST'])
def create_stat_route():
    data = request.get_json()

    strength = data.get('strength')
    dexterity = data.get('dexterity')
    constitution = data.get('constitution')
    intelligence = data.get('intelligence')
    wisdom = data.get('wisdom')
    charisma = data.get('charisma')

    create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma)

    return jsonify({'message': 'Stat created successfully'})

#####################
# CHARACTER FUNCTIONS
#####################
@app.route('/character/<int:character_id>', methods=['GET'])
def get_character_route(character_id):
    character = get_character(character_id)
    if character:
        return jsonify(vars(character))
    else:
        return jsonify({'error': 'Character not found'}, 404)

#####################
# MONSTER FUNCTIONS
#####################
@app.route('/monster/<int:monster_id>', methods=['GET'])
def get_monster_route(monster_id):
    monster = get_monster(monster_id)
    if monster:
        return jsonify(vars(monster))
    else:
        return jsonify({'error': 'Monster not found'}, 404)

#####################
# ATTACK FUNCTIONS
#####################
@app.route('/attack/<int:attack_id>', methods=['GET'])
def get_attack_route(attack_id):
    attack = get_attack(attack_id)
    if attack:
        return jsonify(vars(attack))
    else:
        return jsonify({'error': 'Attack not found'}, 404)

if __name__ == '__main__':
    app.run(debug=True)
