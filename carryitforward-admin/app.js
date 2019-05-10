const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const passwordEntry = require('./routes/password-entry.js');
const admin = require('./routes/admin.js');

const authMiddleware = require('./middlewares/auth.js');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const sessionOpts = {
  resave: true,
  saveUninitialized: true,
  secret: 'UCwn8Vw3@PbV5joE#SpkUcJwB1TDsG!O!^f#%R8yQ6kVNHGo9g8$d0AV45Sfe7QT',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 Hours
  }
};
app.use(session(sessionOpts));
app.use(authMiddleware);

app.use('/password-entry', passwordEntry);
app.use('/admin', admin);

module.exports = app;
