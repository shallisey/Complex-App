const User = require('../models/User');

exports.login = () => {};

exports.logout = () => {};

exports.register = function(req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send('No errors');
  }
};

exports.home = (req, res) => {
  res.render('home-guest');
};
