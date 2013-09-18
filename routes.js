var routes = {};

routes.home = function (req, res) {
  console.log("home to be rendered");
  res.render("home");
};

routes.githook = function (req, res) {
  res.send("githooked!");
};

module.exports = routes;