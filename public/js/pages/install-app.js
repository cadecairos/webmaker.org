requirejs.config({
  baseDir: "/js",
  paths: {
    "analytics": "/bower_components/webmaker-analytics/analytics",
    "jquery": "/bower_components/jquery/jquery.min"
  }
});

require(["jquery", "analytics"], function ($, analytics) {
  "use strict";
  var downloadButtons = $(".download-app-btn");
  downloadButtons.click(function () {
    analytics.event("Download Beta App");
    window.setTimeout(function () {
      window.open("http://mzl.la/installwm", "_blank");
    }, 150);
  });
});
