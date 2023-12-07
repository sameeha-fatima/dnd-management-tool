# dnd-management-tool

### Late submission to fix bugs

### Team Members
- Janet Green 
- Johnny Brain  
- Kevin Gallagher 
- Sameeha Fatima  
- Sean Yi 

## Database
Import dnd.sql to mysql workbench
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
Login path: "/"
Create Account path: "/createAccount"
Session Control path: "/sessionControl/:userID"
Session Editing path: "/session/:userID/:sessionId"
Add Entity path: "/addEntity"
Edit Entity path: "/editEntity"
