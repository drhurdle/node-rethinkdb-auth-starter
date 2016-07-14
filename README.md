# node-rethinkdb-auth-starter

This is a simple starter API using NodeJS, Express, and RethinkDB including token authentication.  

This is still a work in progress.  I wanted to create something that would allow me to get a node api off the ground quickly and thought it may be usefull for someone else.  

I plan to add some additional, common policies for restricting access to API endpoints

Feel free to use it to build your api's let me know if there is anything else I can add that would be usefull and common for many API's

Install dependencies : 
```
$ npm install
```
Start up rethinkdb and the server :
```
$ rethinkdb
$ node server.js
```
To run tests :
```
$ mocha
```

API endpoints at ```localhost:8000/api/``` :

| Method | Path | Parameters |  Protected |     |
| :---: | :---: | :---: | :---: | :--- |
| POST | /user | username : password | none | Create a User and returns token|
| GET | /users | - - - | none | Returns List of User Objects |
| GET | /user/:id | - - - | none | Returns the user with the given ID |
| DEL | /user/:id | - - - | isAuthorized, isCurrentUser | Deletes a user with the given ID |
| POST | /login | username : password | none | Log In Route : Returns logged in user and token |



For all ```isCurrentUser``` protected routes, the target the route's target user must be the user accessing that endpoint.

For all ```isAuthorized``` protected routes, be sure to include an ```Authorization``` header with the value ```Bearer [YOUR-TOKEN]```