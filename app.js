const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');

const userSchema = require('./schema/schema');

mongoose.connect('mongodb://localhost:27017/google-auth', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/auth');
});

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));


var passport = require('passport');
var userProfile;
 
app.use(passport.initialize());
app.use(passport.session());
 
app.get('/success', async(req, res) => {
    try{
        var email=userProfile.emails[0].value;
        var name=userProfile.displayName;
        var data={email:email,name:name};
        await userSchema.create(data);
        res.render('pages/success', {user: userProfile});
    }catch(e){
        console.log(`this is the error ${e}`);
    }

});

app.get('/logout' , (req,res) => {
    req.session = null;
    req.logOut();
    res.redirect('/');
})

app.get('/error', (req, res) => res.send("error logging in"));
 
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
 
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'our-google-client-id';
const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';

passport.use(new GoogleStrategy({
    clientID: "789534669963-9me4sktadhc7a8c210t2b1hmbtc38627.apps.googleusercontent.com",
    clientSecret: "rUyVdHODfda0ZWmEK8pRbafh",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });