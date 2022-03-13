require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./config');
const path = require('path');

// const bcrypt = require('bcrypt');


const app = express();
const PORT = process.env.PORT || 3001;
const sessionSettings = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
};

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.use(session(sessionSettings));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({
	force: false
}).then(() => {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

