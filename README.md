Hello :) Welcome to Shiok Rider's orbital journey!

The files and directories are:

/shiok - App.js

/shiok/src - navigationRef.js

/shiok/src/screens - All the <>Screens.js files

/shiok/src/context - All the <>Context.js files

/shiok/src/api - API.js

/shiok/src/components - Spacer.js


/shiok-server/src - index.js

/shiok-server/models - Hitcher.js

/shiok-server/routes - authRoutes.js

/shiok-server/middlewares  - requireAuth.js

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

We have created our custom express API in the shiok-server directory to connect with the MongoDB cloud server via Mongoose. This connection is verified by manually transacting API requests via the Postman App to localhost:3000.

The shiok directory contains our React Native codes to connect to the MongoDB cloud server using the 'axios' package and ngrok, via the custom express API created.

The API.js contains the axios configuration, while the AuthContext.js contains the codes to execute POST/GET requests.
