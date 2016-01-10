INSTRUCTIONS TO TEST

To use this app you have to install node.js https://nodejs.org/en/download/

Then MongoDB https://www.mongodb.org/downloads#production, there are tutos to install it regarding the distribution https://docs.mongodb.org/manual/tutorial/

Then you have to launch the database to do it, use a terminal go on the folder where you installed mongo db, then launch the file mongod
    > mongod

Then on the node.js command prompt place you in the carpanel folder and use this command
    > node server.js
    

Then open a browser and go to http://localhost:8080
Click on local signup, choose a username and password if the user is not in use it registers you in the database and redirect you to your profile where you can see your data.

I have still an error saying js-bson Failed to load c++ bson extension, using pure JS version, that is cause because it failed to install node-gyp which is the standard way to compile C++ extensions for NodeJS. However, the code work without problem.
EXPLANATIONS

I used a tutorial for the login and sign up, it uses passport, express, mongoose (for interacting with mongodb) and some sessions modules.

I have used socket.io to refresh the data on the page without refreshing the entire page
 
Values are random and I decided to change those every 2 seconds for testing purpose 

Those values are not really linked to the user, I started to develop something about that but that is not finished, I let it in the code so you can see it

Next step would be to change the values directly in the database, listen for change in the DB and refresh data on change