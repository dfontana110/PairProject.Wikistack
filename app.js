const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(console.log('hello world'));
});

const PORT = 1234;
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
