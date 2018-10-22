### Instructions
1. git clone https://github.com/loftywaif002/yp-app.git
2. cd yp-app
3. npm install
4. npm run start
5. App should be running on http://localhost:5000

### Requirements
1. PostgresDB must be installed locally and database should be created first
2. Create database Ex: psql -U postgres -c 'CREATE DATABASE "yp-database"' from terminal
3. Database connection can be changed in models/user.js if needed

### Technology User
 FrontEnd: React.js  16.5.2
 Backend: Node v8.11.1 (express)
 Database: postgres 9.6
 ORM: Sequelize 4.39.1

### App-Demo
<a href="https://www.youtube.com/watch?v=GUxoBbxhlnA">Youtube Link</a>

### YP-APP SCREENSHOT
 <img width="80%" src="https://preview.ibb.co/ixrdt0/screen-shot-1.png" />
 <br />
 <img width="80%" src="https://preview.ibb.co/jDUnmL/screen-shot-2.png" />
 <br />
 <img width="80%" src="https://preview.ibb.co/kPCzi0/screen-shot-3.png" />
 <br/>
 <img width="80%" src="https://preview.ibb.co/hOEZGL/screen-shot-4.png" />

### Possible improvement
1. Redux-Persist (higher order component to save redux store in localstorage)
2. Uploading images features
3. Handling db migrations Asynchronously
