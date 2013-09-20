(function() {
  
  var githubBtn = document.querySelector("#github-signin");
  
  githubBtn.addEventListener("click", function (evt) {
    evt.preventDefault();
    popupAuth();
  });

  function popupAuth() {
    var redirectUrl = "/login/success";
    var url = "http://pushberry-c9-eddflrs.c9.io/auth/github";
    var win = window.open(url, "Login with GitHub", "width=400, height=1024");
    var poll = window.setInterval(function () {
      console.log('tic ', win.document.URL);
      try {
        if (win.document.URL.indexOf(redirectUrl) != -1) {
          window.clearInterval(poll);
          console.log("URL to window doc", win.document.URL);
          window.setTimeout(function () {
            win.close();
          }, 1000 * 1);
        }
      } catch (err) {
        console.log("Error polling login data ", err);
      }
    }, 100);
  }

}());