var routes = {};

routes.home = function (req, res) {
  console.log("home to be rendered");
  res.render("home");
};

routes.githook = function (req, res) {
  res.send("githooked!");
};

routes.loginWithGithub = function (req, res) {
  console.log("Attempting to login with github");
};

routes.loginWithGithubCb = function (req, res) {
  console.log("loginwith github ok");
  res.redirect('/login/success');
}

routes.loginSuccess = function (req, res) {
  console.log("login success");
  res.render("loginSuccess");
}

routes.logout = function (req, res) {
  req.logout();
  res.redirect();
}
module.exports = routes;