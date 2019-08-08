const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { db } = require('./models');
const models = require('./models');
const layout = require('./views/layout.js');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const path = require('path');

// db.authenticate().then(() => {
//   console.log('connected to the db');
// });
const app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

const connect = async () => {
  await models.db.sync({ force: true });

  const PORT = 1234;
  app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
  });
};
connect();
