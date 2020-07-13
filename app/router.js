module.exports = (app) => {
  const { router } = app;

  router.get("/", "home.index");
  router.get("/loginout", "home.loginOut");
  app.passport.mount("github");
};
