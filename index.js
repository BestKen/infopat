var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  icon: "./img/icon16.png",
  exclude: ['*.webpat.tw', '*.teamserver', '*.ltc.tw', '*.webpatimage.twipr.com'],
  contentStyleFile: "./InfoPat.css",
  contentScriptFile: ["./jquery-1.11.3.min.js", "./InfoPat.js", "./rules.js"]
});

var { ActionButton } = require("sdk/ui/button/action");
var windowUtils = require("sdk/window/utils");

var button = ActionButton({
  id: "InfoPat",
  label: "InfoPat",
  icon: {
    "16": "./img/icon16.png"
    },
    onClick: function(state) {
      var gBrowser = windowUtils.getMostRecentBrowserWindow().getBrowser();
      gBrowser.addTab("http://webpat.tw/");
    }
  });