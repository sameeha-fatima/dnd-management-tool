# pip install Flask-MySQLdb
# pip install mysql-connector-python

from flask import Flask, jsonify, request
from db import *
import json

app = Flask(__name__)

#####################
# USER FUNCTIONS
#####################

# returns user object
@app.route('/login', methods=['POST'])
def login_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username and password:
        user = login(username, password)
        if user is None:
            return jsonify({'error': 'Invalid username or password'}, 401)
        else: 
            return jsonify(vars(user))
    else:
        return jsonify({'error': 'Username or password is missing'}, 400)

# @app.route('/user', methods=['GET'])
# def get_user_route(user_id):
#     user = get_user(user_id)
#     if user:
#         return jsonify(vars(user))
#     else:
#         return jsonify({'error': 'User not found'}, 404)

@app.route('/user', methods=['POST'])
def create_user_route():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    password = data.get('password')

    create_user(first_name, last_name, username, password)
    
    return jsonify({'message': 'User created successfully'})

@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_user_route():
    if user_id is not None:
        delete_user(user_id)
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'error': 'UserID is missing or incorrect'}, 400)

#####################
# SESSION FUNCTIONS
#####################

# returns all sessions owned by user
@app.route('/session_all/<int:user_id>', methods=['GET'])
def get_all_sessions_route(user_id):
    sessions = get_all_sessions(user_id)
    return jsonify(sessions)

# return specific session info
@app.route('/session/<int:session_id>', methods=['GET'])
def get_session_route(session_id):
    session = get_session(session_id)
    town = get_all_towns(session_id)
    # player = get_all_players(session_id)
    # character = get_all_characters(session_id)
    monster = get_all_monsters(session_id)
    attack = get_all_attacks(session_id)

    if session:
        townList = []
        for t in town:
            townList.append(vars(t))
        monsterList = []
        for p in monster:
            monsterList.append(vars(p))
        attackList = []
        for a in attack:
            attackList.append(vars(a))
        return json.dumps(townList + monsterList + attackList)

@app.route('/session', methods=['POST'])
def create_session_route():
    data = request.get_json()

    session_name = data.get('session_name')
    user_id = data.get('user_id')
    create_session(session_name, user_id)

    return jsonify({'message': 'Session created successfully'})

@app.route('/session/<int:session_id>', methods=['DELETE'])
def delete_session_route():
    if session_id is not None:
        delete_session(session_id)
        return jsonify({'message': 'Session deleted successfully'})
    else:
        return jsonify({'error': 'SessionID is missing or incorrect'}, 400)

#####################
# CHARACTER FUNCTIONS
#####################
@app.route('/character', methods=['POST'])
def create_character_route(character_id):
    data = request.get_json()

    strength = data.get('strength')
    dexterity = data.get('dexterity')
    constitution = data.get('constitution')
    intelligence = data.get('intelligence')
    wisdom = data.get('wisdom')
    charisma = data.get('charisma')

    stat_id = create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma)

    character_name = data.get('character_name')
    job = data.get('job')
    race = data.get('race')
    session_id = data.get('session_id')

    create_character(character_name, job, race, session_id, stat_id)

    return jsonify({'message': 'Character created successfully'})

@app.route('/character/<int:character_id>', methods=['GET'])
def get_character_route(character_id):
    character = get_character(character_id)
    stat = get_stat(character.stat_id)
    if character and stat:
        return jsonify(vars(character) + var(stat))
    else:
        return jsonify({'error': 'Character not found'}, 404)

@app.route('/character/<int:character_id>', methods=['DELETE'])
def delete_character_route():
    if character_id is not None:
        delete_character(character_id)
        return jsonify({'message': 'Character deleted successfully'})
    else:
        return jsonify({'error': 'CharacterID is missing or incorrect'}, 400)

#####################
# TOWN FUNCTIONS
#####################
@app.route('/town', methods=['POST'])
def create_town_route():
    data = request.get_json()

    town_name = data.get('town_name')
    session_id = data.get('session_id')
    create_town(town_name, session_id)

    return jsonify({'message': 'Town created successfully'})

@app.route('/town/<int:town_id>', methods=['GET'])
def get_town_route(town_id):
    town = get_town_characters(town_id)
    if town:
        return jsonify(vars(town))
    else:
        return jsonify({'error': 'town not found'}, 404)

@app.route('/town/<int:town_id>', methods=['DELETE'])
def delete_town_route():
    if town_id is not None:
        delete_town(town_id)
        return jsonify({'message': 'Town deleted successfully'})
    else:
        return jsonify({'error': 'TownID is missing or incorrect'}, 400)

#####################
# MONSTER FUNCTIONS
#####################
@app.route('/monster', methods=['POST'])
def create_monster_route():
    data = request.get_json()

    strength = data.get('strength')
    dexterity = data.get('dexterity')
    constitution = data.get('constitution')
    intelligence = data.get('intelligence')
    wisdom = data.get('wisdom')
    charisma = data.get('charisma')

    stat_id = create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma)
    monster_name = data.get('monster_name')
    session_id = data.get('session_id')

    monster_id = create_monster(monster_name, session_id, stat_id)
    attacks = data.get('attacks')

    for i in attacks:
        create_monster_attack(i, monster_id)

    return jsonify({'message': 'Monster created successfully'})

@app.route('/monster/<int:monster_id>', methods=['GET'])
def get_monster_route(monster_id):
    monster = get_monster(monster_id)
    stat = get_stat(monster.stat_id)
    attacks = get_all_monster_attacks(monster_id)
    if monster:
        return jsonify(vars(monster)+vars(stat)+vars(attacks))
    else:
        return jsonify({'error': 'Monster not found'}, 404)

@app.route('/monster/<int:monster_id>', methods=['DELETE'])
def delete_monster_route():
    if monster_id is not None:
        delete_monster(monster_id)
        return jsonify({'message': 'Monster deleted successfully'})
    else:
        return jsonify({'error': 'MonsterID is missing or incorrect'}, 400)

#####################
# ATTACK FUNCTIONS
#####################
@app.route('/attack', methods=['POST'])
def create_attack_route():
    data = request.get_json()

    attack_name = data.get('attack_name')
    damage = data.get('damage')
    session_id = data.get('session_id')
    create_attack(attack_name, damage, session_id)

    return jsonify({'message': 'Attack created successfully'})

@app.route('/attack/<int:attack_id>', methods=['GET'])
def get_attack_route(attack_id):
    attack = get_attack(attack_id)
    if attack:
        return jsonify(vars(attack))
    else:
        return jsonify({'error': 'Attack not found'}, 404)
    
# returns all attacks
@app.route('/attacks', methods=['GET'])
def get_all_attacks_route():
    attacks = get_all_attacks()
    if attacks:
      return jsonify(attacks)
    else:
      return jsonify({'error': 'Attacks not found'}, 404)

@app.route('/attack/<int:attack_id>', methods=['DELETE'])
def delete_attack_route():
    if attack_id is not None:
        delete_attack(attack_id)
        return jsonify({'message': 'Attack deleted successfully'})
    else:
        return jsonify({'error': 'AttackID is missing or incorrect'}, 400)

#####################
# PLAYER FUNCTIONS
#####################
@app.route('/player', methods=['POST'])
def create_player_route():
    data = request.get_json()

    strength = data.get('strength')
    dexterity = data.get('dexterity')
    constitution = data.get('constitution')
    intelligence = data.get('intelligence')
    wisdom = data.get('wisdom')
    charisma = data.get('charisma')

    stat_id = create_stat(strength, dexterity, constitution, intelligence, wisdom, charisma)

    character_name = data.get('character_name')
    job = data.get('job')
    race = data.get('race')
    session_id = data.get('session_id')

    character_id = create_character(character_name, job, race, session_id, stat_id)
    _class = data.get('class')
    alignment = data.get('alignment')

    player_id = create_player(_class, alignment, character_id)
    attacks = data.get('attacks')

    for i in attacks:
        create_player_attack(i, player_id)

    return jsonify({'message': 'Player created successfully'})

@app.route('/player/<int:player_id>', methods=['GET'])
def get_player_route(player_id):
    player = get_player(player_id)
    stat = get_stat(player.stat_id)
    attacks = get_all_player_attacks(player)
    if player:
        return jsonify(vars(player)+vars(stat)+vars(attacks))
    else:
        return jsonify({'error': 'Player not found'}, 404)

@app.route('/player/<int:player_id>', methods=['DELETE'])
def delete_player_route():
    if player_id is not None:
        delete_player(player_id)
        return jsonify({'message': 'Player deleted successfully'})
    else:
        return jsonify({'error': 'PlayerID is missing or incorrect'}, 400)

if __name__ == '__main__':
    app.run(debug=True)
