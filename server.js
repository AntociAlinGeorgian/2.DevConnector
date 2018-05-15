const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

//initiate app
const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
    .connect(db)
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

//routes
app.get("/", (req, res) => res.send("Hello!"));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//server setup and run
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));