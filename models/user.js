const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        // required: true
    }
});

// UserSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// UserSchema.statics.signin = async function (email, password) {
//     const user = await this.findOne({ email });
//     const errorMessage1 = 'Passwords did not match!';
//     const errorMessage2 = 'This email is yet to sign up!';
//     if (user) {
//         const passwordCheck = await bcrypt.compare(password, user.password);
//         if (passwordCheck) {
//             return user;
//         } else {
//             console.log('Passwords did not match!');
//             return errorMessage1;
//         }
//     } else {
//         console.log('This email is yet to sign up!');
//         return errorMessage2;
//     }
// }

module.exports = mongoose.model('user', UserSchema);