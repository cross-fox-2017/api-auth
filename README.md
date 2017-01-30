# API Basic

Demo app with Basic REST API.

REST API

List of User routes:

| Routes                | HTTP  | Description
| --------------        | ----- | -----------
| /api/users/signup     | POST  | Sign up with new User info
| /api/users/signin     | POST  | Sing in while get an access token based on credentials
| /api/users            | GET   | Get all users
| /api/users/:id        | GET   | Get single user
| /api/users/           | POST  | Create new user
| /api/users/:id        | DELETE| Delete a user
| /api/users/:id        | PUT   | Update a user with new info
| /api/users/:id        | PATCH | Update a use with specific info


Usage

with only npm :
> npm install

> npm start

Access the website via :
> http://localhost:3000

or API via :

> http://localhost:3000/api.
