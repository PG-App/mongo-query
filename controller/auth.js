const nodemailer = require('nodemailer');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nestpg244@gmail.com',
        pass: process.env.MAIL_PASSWORD
    }
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = role => {
    return jwt.sign({ role }, 'secret', {
        expiresIn: maxAge
    });
};

module.exports.signup_post = (req, res) => {
    const { name, email, password } = req.body;
    // console.log(req.body);

    const fullUrl = req.protocol + '://' + req.get('host');
    // + req.originalUrl;
    console.log(fullUrl);

    User.findOne({ email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'This email id is already registered!!!'
            });
        }

        const token = jwt.sign({ name, email, password }, 'secret', { expiresIn: '10m' });
        console.log(token);

        const mailOptions = {
            from: 'ssnbhelp@protonmail.com',
            to: email,
            subject: 'Account activation link',
            html:
                // `<h3>Please <a href="http://localhost:5000/api/authentication/activate/${token}">click</a> here to activate your account.
                //         `
                `<h3>Please <a href="${fullUrl}/api/authentication/activate/${token}">click</a> here to activate your account.
                        `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ error: 'Oops! Some error occured on sending the mail!' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Please check your email to verify your account!' });
            }
        });
    });
}

module.exports.activateAccount = (req, res) => {
    const token = req.params.token;

    if (token) {
        jwt.verify(token, 'secret', (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/api/signup');
            } else {
                console.log(decodedToken);
                const { name, email, password } = decodedToken;
                const user = new User({ name, email, password });
                user.save((err, user) => {
                    if (err) {
                        console.log(err);
                        return res.json(err);
                    }
                    console.log(user);
                    return res.json(user);
                });
            }
        });
    } else {
        res.redirect('/api/signup');
    }
}

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signin(email, password);
        console.log(user);
        const token = createToken(user.role);
        console.log(token);
        res.cookie('pg-app', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ token, user: user });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err });
    }
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    return res.json({ message: 'Signout success' });
};