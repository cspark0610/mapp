const express = require("express");
const helmet = require("helmet");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./config/db");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const User = require("./models/User");
const cors = require("cors");
const morgan = require("morgan")

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const config = require("./server.config");
app.use(cors());
app.use(helmet());
app.use(session({ secret: "bootcamp" }));
app.use(morgan("tiny"));

// rutas 
const routes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser())


app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (inputEmail, password, done) {
      User.findOne({
        where: {
          email: inputEmail
        }
      })
        .then((user) => {
          if (!user) {
            return done(null, false); // user not found
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // invalid password
            }
            done(null, user); // success :D
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
// How we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then(user => done(null, user))
});

// Express Routing
app.use("/api/", routes);

//sync
db.sync({ force: false }).then(() => {
  http.createServer(app).listen(config.port, () => {
    console.log(`Server listening at port ${config.port}`);
  });
})