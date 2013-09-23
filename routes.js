var routes = {};

routes.home = function (req, res) {
  if (req.user) {
    return res.redirect('/dash');
  }
  res.render('home');
};

routes.dashboard = function (req, res) {
  function prepUserData (user) {
    user.firstName = req.user.profile.displayName.split(' ')[0];
  }

  console.log("Request user: ", req.user);
  prepUserData(req.user);
  res.render('dashboard', { user: req.user });
};

routes.githook = function (req, res) {
  res.send("githooked!");
};

routes.loginWithGithub = function (req, res) {
  console.log("Attempting to login with github");
};

routes.loginWithGithubCb = function (req, res) {
  console.log("loginwith github ok");
  res.cookie('accessToken', req.user.accessToken);
  res.redirect('/login/success');
}

routes.loginSuccess = function (req, res) {
  res.render("loginSuccess");
}

routes.loginFailure = function (req, res) {
  console.log("Failed to login");
  res.redirect('/');
}

routes.logout = function (req, res) {
  req.logout();
  res.redirect('/');
}
module.exports = routes;