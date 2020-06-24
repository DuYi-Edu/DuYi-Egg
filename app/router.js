module.exports = (app) => {
  const { router } = app;
  router.get("/login", "sub.home.login");
  router.get("/signed-in", "sub.home.login");

  router.resources("blogs", "/b", "blog");
};

// controller: { sub: {home: {index: fn}}  }
