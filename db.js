const mongodb = require('mongodb');

const connectionString =
  'mongodb+srv://todoAppUser:gigival@cluster0-etfb8.mongodb.net/ComplexApp?retryWrites=true&w=majority';

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    module.exports = client.db();
    const app = require('./app');
    app.listen(3000);
  }
);
