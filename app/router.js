module.exports = (app) => {
  const { router } = app;

  router.get("/api/news", "news.index");

  router.get("*", "home.index");
};
