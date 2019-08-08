const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./models');
const models = require('./models');

// db.authenticate().then(() => {
//   console.log('connected to the db');
// });
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

const layout = require('./views/layout.js');

app.get('/', (req, res) => {
  res.send(layout(' '));
});

const connect = async () => {
  await models.db.sync({ force: true });

  const PORT = 1234;
  app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
  });
};
connect();
