const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('mongodb');

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    module.exports = client;
    const app = require('./app');
    app.listen(process.env.PORT || 3000, function() {
      console.log(
        'Express server listening on port %d in %s mode',
        this.address().port,
        app.settings.env
      );
    });
  }
);
