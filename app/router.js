module.exports = (app) => {
  const { router } = app;
  router.get("/", "home.index");
};

// controller: { sub: {home: {index: fn}}  }
