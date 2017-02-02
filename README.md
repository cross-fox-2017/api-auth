# api-auth
----

API

| ROUTER          | HTTP   | DESCRIPTION
| --------------- |:-----: | -----------
| /api/users      | GET    | Get all users
| /api/users/:id  | GET    | Get one user
| /api/users      | POST   | Create a user
| /api/users/:id  | DELETE | Delete a user
| /api/users/:id  | PUT    | Update a user with new info

# Usage

```
1. npm install
2. npm run dev
```

Test Run :
```
1. localhost:3000/api/users  (Show All Data)
2. localhost:3000/api/users/1 (Show By ID)
3. localhost:3000/api/users/4 (Delete)
4. localhost:3000/api/users/3 (Update Data)
```
