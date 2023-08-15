const express = require("express");
const router = express.Router();

const controller = require("../controllers/contract.controller")

router.get("/", controller.getAccounts);
router.get("/new", controller.createAccount);
router.post("/setToken", controller.setToken);
router.post("/mintNFT", controller.mintNFT);
router.post("/balanceOf", controller.balanceOf);
router.post("/transfer", controller.transfer);
router.post("/approve", controller.approve);

module.exports = router;