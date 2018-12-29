import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import connectMongo from 'connect-mongo';
import flash from 'connect-flash';

import passport from 'passport';
import LocalStrategy from 'passport-local';
// import passport from './configs/passport';
import users from './routes/users';
import User from './models/User';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds229474.mlab.com:29474/authenticate-express`;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connected database'))
    .catch(() => console.log('Failed to connect database'));

const MongoStore = connectMongo(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 7200000,
    },
    name: '_ssid',

}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(function(req, res, next) {
//     res.set('Cache-Control', 'public, max-age=60000');
//     next();
// });
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img/logo.png')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            if (!user.isValidPassword(password)) {
                return done(null, false, { message: 'Invalid credentials' });
            }
            return done(null, user);
        });
    }
));

// app.use('/', users);
app.get('/login', function (req, res) {
    res.render('users/login', { title: 'Login' });
});

app.get('/sweet', function (req, res) {
    console.log('Hiuhiu');
    req.logout();
    req.session.destroy(function() {
        // res.redirect('/');
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/', function (req, res) {
    console.log(req.session);
    if (req.user) {
        return res.end('OK');
    } else {
        return res.redirect('/login');
    }
});

console.log(app._router.stack);

app.listen(port, function() {
    console.log(`Application is running on http://localhost:${port}`);
});
