import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import './configs/passport';

import users from './routes/users';

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
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    },
    name: '_ssid',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img/logo.png')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', users);

app.listen(port, function() {
    console.log(`Application is running on http://localhost:${port}`);
});
