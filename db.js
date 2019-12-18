const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('mongodb');

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    module.exports = client;
    const app = require('./app');
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log('App is running on port ' + port);
    });
  }
);
