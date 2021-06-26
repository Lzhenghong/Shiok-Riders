The files in shiok directory are React Native components (front-end)

The files in shiok-server directory contain our custom express API to connect to MongoDB Atlas via mongoose (middle-end)

-----------------------------------------------------------

Installation:

Download the code into your local repository

cd into /Shiok-Riders/shiok and enter >npm install

cd into /Shiok-Riders/shiok-server and enter >npm install

-----------------------------------------------------------

Starting the expo-cli app:

Open 3 terminals

cd into /Shiok-Riders/shiok-server in the first terminal, then enter >npm run dev

In the second terminal, cd into /Shiok-Riders/shiok-server, then enter >ngrok http 3000

Copy the forwarding URL into the baseUrl in API.js and AuthAPI.js in shiok/src/api 

In the third terminal, cd into /Shiok-Riders/shiok, then enter >npm start






