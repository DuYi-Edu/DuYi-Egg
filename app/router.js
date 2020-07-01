module.exports = (app) => {
  const { router } = app;
  const verifyToken = app.middleware.verifyToken({}, app);
  router.get("/", verifyToken, "home.index");
  router.get("/login", "user.login");
  router.post("/login", "user.handleLogin");
};
