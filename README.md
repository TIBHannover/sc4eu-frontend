# Frontend

Frontend holding an express server as middle ware for social logins and the the frontend using React

The frontend is a combination of express server and react components.
We require express as middle ware to do the oauth login. 
Thus, the react components are served by the express server it self.

The server code is in the folder server.
The frontend code is in the folder a src. 

# Initialization

run `sh install_dependencies.sh`

This runs the `npm install` command in the current and the server folders.

<b>Create an .env file.</b> 
You can find an example for the content in the file `env.example`

<b>The server has also its own .env file.</b> 
You can find an example for the content in the file `/server/env.example`
 

# Starting the server 

run `npm start` in the current folder 

(which is the root folder containing the src and the server folders)

This command will build the the front end and then start the express server.

// this is the call that npm start will execute `npm run build  && (cd server && npm start)`


# Starting the client 

run `npm run start-client` in the current folder 

This will start a react 'server' hosting only the frontend application.
It has the hotreloading and other helpful thigs which can help during the development process of the frontend. 

<b>Note:</b> Login functionallity will not work in this environment. 




 


