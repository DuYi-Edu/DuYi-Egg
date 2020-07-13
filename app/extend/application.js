module.exports = {
  axios: require("axios").default,
  foo() {
    return "bar";
  },
  locals: {
    globalTitle: "地区数据库",
  },
};
