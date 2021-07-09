require("./models/Hitcher");
require('./models/Driver');
require('./models/DriverListing');
require('./models/HitcherListing');
require('./models/DriverNoti');
require('./models/HitcherNoti');
require('./models/HitcherBooking');
require('./models/DriverBooking');

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const listingRoutes = require('./routes/listingRoutes');
const notiRoutes = require('./routes/notiRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const requireAuth = require("./middlewares/requireAuth");
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  allowedHeaders: 'Content-Type,x-access-token,Origin,Accept,Authorization,X-Requested-With'
};

app.use(cors(corsOptions));

app.use(bodyParser.json({
  limit: '50mb',
  extended: true
}));

app.use(authRoutes);
app.use(profileRoutes);
app.use(listingRoutes);
app.use(notiRoutes);
app.use(bookingRoutes);

const mongoUri = "mongodb+srv://zhenghong:6892380@cluster0.d9fa1.mongodb.net/db?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
