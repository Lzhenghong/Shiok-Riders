Hello :) Welcome to Shiok Rider's orbital journey!

The files in shiok directory are React Native components (front-end)

The files in shiok-server directory contain our custom express API to connect to MongoDB Atlas via mongoose (middle-end)

-----------------------------------------------------------

Please install the following in shiok directory:

npm install

npx expo-cli install react-native-gesture-handler react-native-reanimated react-navigation react-navigation-stack react-navigation-tabs

npm install axios

npm install -g ngrok

npm install @react-native-async-storage/async-storage

npx expo-cli install react-native-maps expo-location

npm install react-native-communications

-----------------------------------------------------------

Please install the following in shiok-server directory:

npm install bcrypt express jsonwebtoken mongoose nodemon cors

-----------------------------------------------------------

Starting the expo-cli app:

Open 3 terminals

cd into /Shiok-Riders/shiok-server in the first terminal, then enter >npm run dev

In the second terminal, cd into /Shiok-Riders/shiok-server, then enter >ngrok http 3000

Copy the forwarding URL into the baseUrl in API.js and AuthAPI.js in shiok/src/api 

In the third terminal, cd into /Shiok-Riders/shiok, then enter >npm start






