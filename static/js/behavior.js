(function() {

  // XX Use a frontend MV* framework.

  var githubBtn = document.querySelector("#github-signin");
  var getReposBtn = document.querySelector("#get-github-repos");

  if (githubBtn) {
    githubBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      popupAuth();
    });
  }

  if (getReposBtn) {
    getReposBtn.addEventListener("click", function (evt) {
      evt.preventDefault();
      var hooks = $.ajax({
        url: "https://api.github.com/repos/eddflrs/pushberry/hooks?access_token="+ $.cookie('accessToken')
      });
      $.when(hooks).then(function () {
        console.log("Got something? ");
        console.log(arguments);
      }, function (error) {
        console.log("Failed? ");
        console.log(arguments);
      });
    });
  }

  function popupAuth() {
    var redirectUrl = "/login";
    // var url = "http://pushberry-c9-eddflrs.c9.io/auth/github";
    var url = "http://127.0.0.1:8888/auth/github";
    var win = window.open(url, "Login with GitHub", "width=400, height=1024");
    var poll = window.setInterval(function () {
      console.log('tic ');
      try {
        if (!win || win.closed || win.document.URL.indexOf(redirectUrl) != -1) {
          window.clearInterval(poll);
          window.setTimeout(function () {
            win.close();
            window.location = "http://127.0.0.1:8888/dash"
          }, 1000 * 1);
        }
      } catch (err) {
        console.log("Error polling login data ", err);
      }
    }, 100);
  }

}());