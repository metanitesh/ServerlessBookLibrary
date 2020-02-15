# Serverless Library App
### Running the application 
```
  cd client
  npm install
  npm run start
  This should start a development server with the React application that will interact with the serverless TODO application.
```

### Deployed API points
 -  GET - https://lazz2avno8.execute-api.ap-south-1.amazonaws.com/dev/todos
 - POST - https://lazz2avno8.execute-api.ap-south-1.amazonaws.com/dev/todos
 - PATCH - https://lazz2avno8.execute-api.ap-south-1.amazonaws.com/dev/todos/{todoId}
 - DELETE - https://lazz2avno8.execute-api.ap-south-1.amazonaws.com/dev/todos/{todoId}
 - POST - https://lazz2avno8.execute-api.ap-south-1.amazonaws.com/dev/todos/{todoId}/attachment

These points are protected. Sign in to app and use the JWT token to access them. 

### Riunning backend locally
You will have to configure AWS credentials for it. Please not that this will create the infrastructure on aws and it will cost the money.

To deploy an application run the following commands:
```
cd backend
npm install
sls deploy -v
```

### Screenshot of app
![screeshot](https://github.com/metanitesh/Serverless-ToDo/blob/master/library-app.png "screeshot")

### Screenshot of xray tracing 
![screeshot](https://github.com/metanitesh/Serverless-ToDo/blob/master/x-ray.png "screeshot")

