# CRUD-API
You need to clone the repository: [link](https://github.com/KateKaliaha/CRUD-API.git) (switch develop)

Start app in development  
npm run start:dev

Start app in production  
npm run start:prod

Start app in multi  
npm run start:multi

Then go to https://www.postman.com/ and send requests:

Get all users -> GET http://127.0.0.1:4000/api/users

Create new user -> POST http://127.0.0.1:4000/api/users + body raw JSON (all areas required)  

{
    "username": "string",
    "age": number,
    "hobbies": [] || [string]
}
Get user by id -> GET http://127.0.0.1:4000/api/users/${id}   

Update user -> PUT http://127.0.0.1:4000/api/users/${id} + body raw JSON (all areas required)    

{
    "username": "new name",
    "age": number,
    "hobbies": [new data]
}
Delete user -> DELETE http://127.0.0.1:4000/api/users/${id}

Tests 3 scenario
Run tests

npm run test
