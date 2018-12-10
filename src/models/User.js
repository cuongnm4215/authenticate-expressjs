import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true},
    password: { type: String, required: true },
    token: String,
    fullname: String,
    birthday: { type: Date, default: Date.now },
    address: String,
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    del_flag: { type: Boolean, default: false }

});

schema.methods.setPassword = function setPassword(password) {
    this.password = bcryptjs.hashSync(password, 10);
}

schema.plugin(uniqueValidator, {message: 'Username is already taken'});

const User = mongoose.model('User', schema);

export default User;
