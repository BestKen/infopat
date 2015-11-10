var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: "*",
  icon: "./img/icon16.png",
  exclude: ['*.webpat.tw', '*.teamserver', '*.ltc.tw', '*.webpatimage.twipr.com'],
  contentStyleFile: "./InfoPat.css",
  contentScriptFile: ["./jquery-1.11.3.min.js", "./InfoPat.js", "./rules.js"]
});
