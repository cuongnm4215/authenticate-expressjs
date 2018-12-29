import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './../models/User';

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

export default passport;
