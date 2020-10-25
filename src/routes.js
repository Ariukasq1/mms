const routes = require("next-routes");

module.exports = routes()
  .add("index", "/?lang=:lang")
  .add("portfolio-detail", "/portfolio/:parentSlug/detail/:slug");
