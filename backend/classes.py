class User:
    def __init__(this, user_id, first_name, last_name, username, password):
        this.user_id = user_id
        this.first_name = first_name
        this.last_name = last_name
        this.username = username
        this.password = password

class Session:
    def __init__(this, session_id, session_name, user_id):
        this.session_id = session_id
        this.session_name = session_name
        this.user_id = user_id

class Town:
    def __init__(this, town_id, town_name, session_id):
        this.town_id = town_id
        this.town_name = town_name
        this.session_id = session_id

class Stat:
    def __init__(this, stat_id, strength, dexterity, constitution, intelligence, wisdom, charisma):
        this.stat_id = stat_id
        this.strength = strength
        this.dexterity = dexterity
        this.constitution = constitution
        this.intelligence = intelligence
        this.wisdom = wisdom
        this.charisma = charisma

class Character:
    def __init__(this, character_id, character_name, job, race, session_id, stat_id):
        this.character_id = character_id
        this.character_name = character_name
        this.job = job
        this.race = race
        this.session_id = session_id
        this.stat_id = stat_id

class CharacterTown:
    def __init__(this, character_town_id, town_id, character_id):
        this.character_town_id = character_town_id
        this.town_id = town_id
        this.character_id = character_id

class Monster:
    def __init__(this, monster_id, monster_name, session_id, stat_id):
        this.monster_id = monster_id
        this.monster_name = monster_name
        this.session_id = session_id
        this.stat_id = stat_id

class Player:
    def __init__(this, player_id, _class, alignment, character_id):
        this.player_id = player_id
        this._class = _class
        this.alignment = alignment
        this.character_id = character_id

class Attack:
    def __init__(this, attack_id, attack_name, damage, session_id):
        this.attack_id = attack_id
        this.attack_name = attack_name
        this.damage = damage
        this.session_id = session_id

class PlayerAttack:
    def __init__(this, player_attack_id, attack_id, player_id):
        this.player_attack_id = player_attack_id
        this.attack_id = attack_id
        this.player_id = player_id

class MonsterAttack:
    def __init__(this, monster_attack_id, attack_id, monster_id):
        this.monster_attack_id = monster_attack_id
        this.attack_id = attack_id
        this.monster_id = monster_id
