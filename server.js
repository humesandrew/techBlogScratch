require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/index.js');
const path = require('path');
const exphbs = require('express-handlebars');

// const bcrypt = require('bcrypt');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelizeStore = require('connect-session-sequelize')(session.Store)

const sessionSettings = {
	secret: process.env.SESSION_SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new sequelizeStore({
		db: sequelize
	})
};
app.use(session(sessionSettings));
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));




app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes'));


sequelize.sync({
	force: false
}).then(() => {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

