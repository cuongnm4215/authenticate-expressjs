import express from 'express';
import passport from './../configs/passport';

import User from './../models/User';
import { parseError } from './../ultis/common';

const router = express.Router();

router.get('/login', function(req, res) {
    res.render('users/login', {title: 'Login'});
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', function(req, res) {
    res.render('users/register', {title: 'Register'});
});

router.post('/register', function(req, res) {
    const credentials = req.body;
    const {username, password} = credentials;

    const user = new User({username});
    user.setPassword(password);
    user.save()
        .then(() => {
            res.redirect('/login');
        })
        .catch(() => {
            res.redirect('/register');
        });
});

export default router;
