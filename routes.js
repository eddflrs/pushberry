
var routes = {};

routes.home = function (req, res) {
	res.send("home");
};

routes.githook = function (req, res) {
	res.send("githooked!");
};

module.exports = routes;
