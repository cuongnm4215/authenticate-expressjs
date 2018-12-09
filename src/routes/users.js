import express from 'express';

const router = express.Router();

router.get('/login', function(req, res) {
    res.render('users/login', {title: 'Login'});
});

router.post('/login', function (req, res) {
    console.log(req.body);
    res.redirect('/login');
});

router.get('/register', function(req, res) {
    res.render('users/register', {title: 'Register'});
});

router.post('/register', function(req, res) {
    const { body } = req;
    console.log(body);
    res.redirect('/register');
});

export default router;
