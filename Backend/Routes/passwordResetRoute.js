const passwordResetRouter = require("express").Router();
const controller = require("../controllers/passwordResetController");

passwordResetRouter
    .get('/reset', controller.resetRoute)
    .post('/reset', controller.generatePasswordReset)
    .post('/reset-pass', controller.updatePassword);


module.exports = passwordResetRouter;