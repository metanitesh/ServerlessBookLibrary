# Serverless Library App
### Running the application 
```
  cd client
  npm install
  npm run start
  This should start a development server with the React application that will interact with the serverless TODO application.
```


### Riunning backend locally
You will have to configure AWS credentials for it. Please not that this will create the infrastructure on aws and it will cost the money.

To deploy an application run the following commands:
```
cd backend
npm install
sls deploy -v
```

### Screenshot of app
![screeshot](https://github.com/metanitesh/ServerlessBookLibrary/blob/master/library-app.png "screeshot")

### Screenshot of xray tracing 
![screeshot](https://github.com/metanitesh/ServerlessBookLibrary/blob/master/x-ray.png "screeshot")

