# pip install Flask-MySQLdb
# pip install mysql-connector-python

from flask import Flask

app = Flask(__name__)

#####################
# USER FUNCTIONS
#####################
@app.route('/create_user_route', methods=['POST'])
def create_user_route():
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    password = data.get('password')

    create_user(first_name, last_name, username, password)

    return jsonify({'message': 'User created successfully'})
  
@app.route('/get_user/<int:user_id>', methods=['GET'])
def get_user_route(user_id):
    user = get_user(user_id)
    if user:
        return jsonify(vars(user))
    else:
        return jsonify({'error': 'User not found'}, 404)

@app.route('/delete_user_route', methods=['DELETE'])
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
@app.route('/create_session_route', methods=['POST'])
def create_session_route():
    data = request.get_json()

    session_name = data.get('session_name')
    user_id = data.get('user_id')
    create_session(session_name, user_id)

#####################
# CHARACTER FUNCTIONS
#####################
@app.route('/get_character/<int:character_id>', methods=['GET'])
def get_character_route(character_id):
    character = get_character(character_id)
    if character:
        return jsonify(vars(character))
    else:
        return jsonify({'error': 'Character not found'}, 404)

#####################
# MONSTER FUNCTIONS
#####################
@app.route('/get_monster/<int:monster_id>', methods=['GET'])
def get_monster_route(monster_id):
    monster = get_monster(monster_id)
    if monster:
        return jsonify(vars(monster))
    else:
        return jsonify({'error': 'Monster not found'}, 404)

#####################
# ATTACK FUNCTIONS
#####################
@app.route('/get_attack/<int:attack_id>', methods=['GET'])
def get_attack_route(attack_id):
    attack = get_attack(attack_id)
    if attack:
        return jsonify(vars(attack))
    else:
        return jsonify({'error': 'Attack not found'}, 404)

if __name__ == '__main__':
    app.run(debug=True)
