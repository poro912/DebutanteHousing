const express = require("express");
const router = express.Router();

const controller = require("../controllers/main.controller")

router.get("/", controller.main_get);

module.exports = router;