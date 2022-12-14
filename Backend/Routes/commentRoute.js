const router = require("express").Router();
const controller = require("../controllers/commentController");

router
  .get("/", controller.getAllComments)
  //   .get("/:id", controller.getComment)
  .post("/", controller.createComment);
//   .put("/:id", controller.updateComment)
//   .delete("/:id", controller.deleteComment);

module.exports = router;
