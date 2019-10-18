exports.login = () => {};

exports.logout = () => {};

exports.register = (req, res) => {
  res.send('Register');
};

exports.home = (req, res) => {
  res.render('home-guest');
};
