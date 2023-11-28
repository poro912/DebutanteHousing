const express = require("express");
const router = express.Router();

const controller = require("../controllers/contract.controller")

router.get("/", controller.getAccounts);
router.get("/new", controller.createAccount);
router.post("/setToken", controller.setToken);
router.post("/mintNFT", controller.mintNFT);
router.post("/saleNFT", controller.saleNFT);
router.post("/buyNFT", controller.buyNFT);
router.post("/getAllNftList", controller.getAllNftList);
router.post("/getNftOwnerList", controller.getNftOwnerList);
router.post("/getSaleAllNftList", controller.getSaleAllNftList);
router.post("/getSaleOwnerNftList", controller.getSaleOwnerNftList);
router.post("/balanceOf", controller.balanceOf);
router.post("/transfer", controller.transfer);
router.post("/approve", controller.approve);
router.post("/allowance", controller.allowance);

module.exports = router;