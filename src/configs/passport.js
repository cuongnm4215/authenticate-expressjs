import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from './../models/User';

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username })
            .then((user) => {
                if (!user || !user.isValidatePassword(password)) {
                    return done(null, false, { errors: 'Invalid credentials' });
                }

                return done(null, user);
            }).catch(done);
    }
));
