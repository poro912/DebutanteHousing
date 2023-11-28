const express = require("express");
const router = express.Router();

const main = require("./main.route");
const contract = require("./contract.route")

router.use("/", main);
router.use("/con", contract);

module.exports = router;