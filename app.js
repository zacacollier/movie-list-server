const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chalk = require('chalk');
const ContactModel = require('./models/ContactModel');

const databaseUrl = process.env.MONGODB_URI || 'mongodb://localhost/contact-list-server';

mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl)
  .then(() => console.log(chalk.cyan(`[mongoose] Connected to MongoDB!`)))
  .catch(err => {
    return console.log(chalk.red(`[mongoose] Unable to connect to MongoDB! ${err}`));
  });

const app = express();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3001;

app.set('port', port);

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

app.get('/api/contacts', (req, res, next) => {
  ContactModel.find().exec()
    .then(contacts => res.json(contacts))
    .catch(err => next(err));
});

app.post('/api/contacts', (req, res, next) => {
  const { avatar, name, occupation } = req.body;
  const contact = new ContactModel({ avatar, name, occupation }).save()
    .then(contact => res.json(contact))
    .catch(err => next(err));
});

app.all('*', (req, res, next) => {
  req.status = 401;
  return res.json(`Not found. Couldn't find it. It's not here!`);
});

app.use((err, req, res, next) => {
  res.status = 500;
  return res.json('Unable to process request');
});


app.listen(port, () => console.log(chalk.blue(`[express] Listening on port: ${port} [${env}]`)))
