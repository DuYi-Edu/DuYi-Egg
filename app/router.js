module.exports = (app) => {
  const { router } = app;
  router.get("/", "home.index");
  router.get("/login", "user.login");
  router.post("/login", "user.handleLogin");
};

