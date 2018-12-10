import express from 'express';

import User from './../models/User';
import { parseError } from './../ultis/common';

const router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/login');
});

router.get('/login', function(req, res) {
    res.render('users/login', {title: 'Login'});
});

router.post('/login', function (req, res) {
    res.redirect('/login');
});

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
