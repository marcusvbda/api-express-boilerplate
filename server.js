require('dotenv').config({ path: '.env' });

require('module-alias').addAliases({
  '~': __dirname,
  '@src': `${__dirname}/src`,
});

const { Auth } = require('@src/middlewares/auth.middleware');

const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const DBConn = require('@src/utils/connector.util');

DBConn.connect();

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

const bodyParser = require('body-parser');
const debug = require('console-development');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('api is running ...');
});

http.prependListener('request', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  const uri = process.env.APP_URL;
  debug.log(`listening on ${uri}:${port}`);
});

app.use('/auth', require('./src/routes/auth.route'));
app.use('/contacts', Auth, require('./src/routes/contacts.route'));
