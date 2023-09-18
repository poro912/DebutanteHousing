const express = require("express");
const Router = express();

const controller = require("./controller")

Router.get("/", controller.getAccounts);
Router.get("/new", controller.createAccount);
Router.post("/setToken", controller.setToken);
Router.post("/mintNFT", controller.mintNFT);
Router.post("/saleNFT", controller.saleNFT);
Router.post("/buyNFT", controller.buyNFT);
Router.post("/getAllNftList", controller.getAllNftList);
Router.post("/getNftOwnerList", controller.getNftOwnerList);
Router.post("/getSaleAllNftList", controller.getSaleAllNftList);
Router.post("/getSaleOwnerNftList", controller.getSaleOwnerNftList);
Router.post("/balanceOf", controller.balanceOf);
Router.post("/transfer", controller.transfer);
Router.post("/approve", controller.approve);
Router.post("/allowance", controller.allowance);

exports.module = Router;