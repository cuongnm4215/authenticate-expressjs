import express from 'express';

const router = express.Router();

router.get('/login', function(req, res) {
    res.render('users/login');
});

router.get('/register', function(req, res) {
    res.render('users/register');
});

router.post('/register', function(req, res) {
    const { body } = req;
    console.log(body);
    res.end('Success');
});

export default router;
