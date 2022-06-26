module.exports = (app) => {
  const tut = require("../controllers/tut.controller.js");
  var router = require("express").Router();
  router.get("/", tut.findAll);
  router.post("/", tut.create);
  router.get("/published", tut.findPublished);
  router.get("/:id", tut.findOne);
  router.put("/:id", tut.update);
  router.delete("/:id", tut.delete1);
  router.delete("/", tut.deleteAll);
  app.use("/api/tutorials", router); // '/api/tutorials' is the base URL for all the routes defined here.
};
