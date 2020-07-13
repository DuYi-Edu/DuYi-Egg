exports.keys = "duyi.com";

exports.view = {
  mapping: {
    ".ejs": "ejs",
  },
  defaultViewEngine: "ejs",
  defaultExtension: ".ejs",
};

exports.passportGithub = {
  key: "cd5d33531c2a194d126e",
  secret: "1bc48c83f8ed87a6676c64fe9d157ab8d2550167",
  callbackURL: "/passport/github/callback",
};
