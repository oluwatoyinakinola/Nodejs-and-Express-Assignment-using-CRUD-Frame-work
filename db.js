const mongoose = require('mongoose');

const uri = 'mongodb://0.0.0.0:27017';
const dbName = 'expressAssignment-DB';

mongoose.connect(`${uri}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});
