import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true},
    password: String,
    token: String,
    fullname: String,
    birthday: { type: Date, default: Date.now },
    address: String,

});

const User = mongoose.model('User', userSchema);

export default User;
