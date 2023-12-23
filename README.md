# dnd-management-tool

### Team Members
- Janet Green 
- Johnny Brain  
- Kevin Gallagher 
- Sameeha Fatima  
- Sean Yi

## Summary
DnD is a tabletop role-playing game, where Players come together to play in an imaginary world set by the DM (Dungeon Master). Often the DM has to plan a vast world consisting of Players (which consists of their class, race, job, stats, alignment, and attacks), NPCs (which have job, name, race), Monsters (which have their own types and attacks), and Towns (Name), which could take up a lot of time.

This tool is to help keep track of the initial world, so the tool doesn’t track health, inventory, or other such things that can change. Instead, the purpose of our tool is to offer an easy way to keep track of the multiple components and attributes that are needed for an initial gaming session.

Our project will be a tool where the DungeonMaster can look up, add, and delete Players, Monsters, and NPCs within their created Session. The tool has the ability for the DungeonMaster to login to their account and view all the Sessions they are currently in charge of. The DungeonMaster can also create new Towns to use. 

The following are the tables and their relations to other tables:

DungeonMaster 1-to-Many with Session

Player Many to 1 and only 1 with Session
NPC Many to 1 and only 1 with Session
Monster Many to 1 and only 1 with Session

Town 1 to Many with Player
Town 1 to Many with NPC


## Database
Import dnd.sql to mysql workbench <br>
In the project folder, copy .env-template and rename it. Then put your own credentials in the various fields

## Backend Setup
Install server dependencies:
```
pip install -r requirements.txt
```

Start server:
```
python3 server.py
```

## Frontend Setup
Install npm packages:  
```
npm install
```
Run application:  
```
cd /frontend
npm start
```

Run all three at the same time to use the application fully
Application will run on localhost:3000

## Path Links
Login path: "/"<br>
Create Account path: "/createAccount"<br>
Session Control path: "/sessionControl/:userID"<br>
Session Editing path: "/session/:userID/:sessionId"<br>
Add Entity path: "/addEntity"<br>
Edit Entity path: "/editEntity"

## Existing User Credentials to Test with
Username: theGoat23 Password: password<br>
Username: bestTA Password: 12345678
