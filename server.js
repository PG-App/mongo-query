const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

const hostelRoutes = require('./routes/hostel');

const dbURI = 'mongodb://localhost/pg-app';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then((result) => console.log('Mongodb connected...'))
    .catch((err) => console.log(err));

app.use('/api', hostelRoutes);

const PORT = process.env.PORT | 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));