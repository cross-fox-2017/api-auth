# api-basic

```
Make a simple login application, admin create new user
```

API

| ROUTER                            | HTTP    | DESCRIPTION                 |
| ----------------------------------|:-----:  | --------------------------- |
| localhost:3000/api/auth/login     | POST    | login admin                 |
| localhost:3000/api/auth/profile   | POST    | admin profile               |
| localhost:3000/api/auth/register  | POST    | Create a user by admin      |
| localhost:3000/api/users          | GET     | Get all users               |
| localhost:3000/api/users/:id      | GET     | Get one user                |
| localhost:3000/api/users/:id      | DELETE  | Delete a user               |
| localhost:3000/api/users:id       | PUT     | Update a user with new info |

# npm
```
1. express-generator
2. password-hash
3. jwt
```

# Usage

```
1. npm install
2. npm start
```

# how to use this app
```
1. fisrt you need to register by using this url : localhost:3000/api/users by method post, with key username and password
2. go to login
3. after that you will get a token, and then use it, use postman to check it, if the endpoint using get method then using header with x-access-token (req.headers) and fill the value by your token that you get
```
