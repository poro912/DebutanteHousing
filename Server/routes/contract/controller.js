const express = require('express');
const Router = express();
Router.use(express.json());

const Web3 = require('web3');
require('dotenv').config();

const connWallte = require('../../utils/contract').module;

//@notion web3 설정
//const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
const web3 = new Web3(process.env.INFURA_URL);
//@notion 721 컨트랙트 설정
const DHT721abi = require("../../../contract/artifacts/contracts/DH721.sol/DH721.json")
const abi721 = DHT721abi.abi;
//const DHT721 = new web3.eth.Contract(abi721, "0xA6021227bb9b2A7aff42C046F32d68be150080b5");
const DHT721 = new web3.eth.Contract(abi721, process.env.DHT721_ADDRESS);

const DHT20abi = require("../../../contract/artifacts/contracts/DH20.sol/DH20.json")
const abi20 = DHT20abi.abi;
//const DHT20 = new web3.eth.Contract(abi20, "0x006f96E335DB48C05f1f23D3137b02982b1cef71");
const DHT20 = new web3.eth.Contract(abi20, process.env.DHT20_ADDRESS);

const Controller = {
    getAccounts : async(req, res, next) => {
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            res.status(200).send(accounts[0]);
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    createAccount : async(req, res, next) => {
        try{
            const newAccount = await web3.eth.accounts.create();
            res.status(200).send(`New Account Address: ${newAccount.address}, New Account privateKey: ${newAccount.privateKey}`)
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    setToken: async (req, res, next) => {
        try {
          const { tokenAddress } = req.body;
          //const userWallet = await connWallte.DHT721Wallet(process.env.SERVER_WALLET_PRIVATE)

		  const userWallet = web3.eth.accounts.privateKeyToAccount(process.env.SERVER_WALLET_PRIVATE);
		  const connectedContract = DHT721.clone();
		  connectedContract.options.address = process.env.DHT721_ADDRESS;
		  connectedContract.options.from = userWallet.address;
		  web3.eth.accounts.wallet.add(userWallet);
        //console.log(userWallet.address);
		  const result = await DHT721.methods.setToken(tokenAddress).send({ from: userWallet.address, gas: 3000000 });	
		  console.log(result);
		  res.send(result);

		} catch (error) {
          //console.error('Transaction error:', error);
          res.status(500).send(error.message || error);
        }
      },
    mintNFT: async (req, res, next) => {
        try {
          const { accountPirvate, tokenURI, price } = req.body;
          const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
          const gasLimit = 1000000; // 원하는 가스 리미트 설정
            
          const userWallet = web3.eth.accounts.privateKeyToAccount(accountPirvate);
		  const connectedContract = DHT721.clone();
		  connectedContract.options.address = process.env.DHT721_ADDRESS;
		  connectedContract.options.from = userWallet.address;
		  web3.eth.accounts.wallet.add(userWallet);

          const result = await DHT721.methods
            .mintNFT(userWallet.address, tokenURI, price)
            .send({ from: userWallet.address, gasPrice, gasLimit });
      
          console.log(result);
          res.send(result);
        } catch (e) {
          console.error(e);
          res.status(500).send(e.message || e);
        }
      },
    saleNFT : async (req, res, next) => {
        try {
          const { accountPirvate , tokenId, price } = req.body;
          const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
          const gasLimit = 1000000; // 원하는 가스 리미트 설정

          const userWallet = web3.eth.accounts.privateKeyToAccount(accountPirvate);
		  const connectedContract = DHT721.clone();
		  connectedContract.options.address = process.env.DHT721_ADDRESS;
		  connectedContract.options.from = userWallet.address;
		  web3.eth.accounts.wallet.add(userWallet);
      
          const result = await DHT721.methods.saleNFT(tokenId, price).send({ from: userWallet.address, gasPrice, gasLimit });
      
          console.log(result);
          res.send(result);
        } catch (e) {
          console.error(e);
          res.status(500).send(e.message || e);
        }
      },
      buyNFT : async (req, res, next) => {
        try {
          const { accountPirvate, tokenId } = req.body;
          const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
          const gasLimit = 1000000; // 원하는 가스 리미트 설정

          const userWallet = web3.eth.accounts.privateKeyToAccount(accountPirvate);
		  const connectedContract = DHT721.clone();
		  connectedContract.options.address = process.env.DHT721_ADDRESS;
		  connectedContract.options.from = userWallet.address;
		  web3.eth.accounts.wallet.add(userWallet);
      
          const result = await DHT721.methods.buyNFT( tokenId ).send({ from: userWallet.address, gasPrice, gasLimit  });
      
          console.log(result);
          res.send(result);
        } catch (e) {
          console.error(e);
          res.status(500).send(e.message || e);
        }
      },
      
    getAllNftList : async(req, res, next) => {
        try{
            const result = await DHT721.methods.getAllNftList().call()
            
            console.log(result);
            res.status(200).json({
                message : "getAllNftList",
                data : {
                    NFTList : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    getNftOwnerList : async(req, res, next) => {
        try{
            const { account } = req.body;
            const result = await DHT721.methods.getNftOwnerList(account).call()
            
            console.log(result);
            res.status(200).json({
                message : "getNftOwnerList",
                data : {
                    NFTList : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    getSaleAllNftList : async(req, res, next) => {
        try{
            const result = await DHT721.methods.getSaleAllNftList().call()
            
            console.log(result);
            res.status(200).json({
                message : "getNftOwnerList",
                data : {
                    NFTList : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    getSaleOwnerNftList : async(req, res, next) => {
        try{
            const { account } = req.body;
            const result = await DHT721.methods.getSaleOwnerNftList(account).call()
            
            console.log(result);
            res.status(200).json({
                message : "getNftOwnerList",
                data : {
                    NFTList : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },

    balanceOf : async(req, res, next) => {
        try{
            console.log(process.env.INFURA_URL)
            const { account } = req.body;

            const result = await DHT20.methods.balanceOf(account).call()
            
            console.log(result);
            res.status(200).json({
                message : "balance",
                data : {
                    balance : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    transfer : async(req, res, next) => {
        try{
            const { accountPirvate , recipient, amount } = req.body;
            const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
            const gasLimit = 1000000; // 원하는 가스 리미트 설정

            const userWallet = web3.eth.accounts.privateKeyToAccount(accountPirvate);
            const connectedContract = DHT20.clone();
            connectedContract.options.address = process.env.DHT20_ADDRESS;
            connectedContract.options.from = userWallet.address;
            web3.eth.accounts.wallet.add(userWallet);

            const result = await DHT20.methods.transfer(recipient, amount).send({ from: userWallet.address, gasPrice, gasLimit  });
            
            console.log(result);
            res.status(200).json({
                message : "transfer",
                data : {
                    bool : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    approve : async(req, res, next) => {
        try{
            const { accountPirvate, spender, amount } = req.body;
            const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
            const gasLimit = 1000000; // 원하는 가스 리미트 설정

            const userWallet = web3.eth.accounts.privateKeyToAccount(accountPirvate);
            const connectedContract = DHT20.clone();
            connectedContract.options.address = process.env.DHT20_ADDRESS;
            connectedContract.options.from = userWallet.address;
            web3.eth.accounts.wallet.add(userWallet);

            const result = await DHT20.methods.approve(process.env.DHT721_ADDRESS, amount).send({ from: userWallet.address, gasPrice, gasLimit  });
            
            console.log(result);
            res.status(200).json({
                message : "approve",
                data : {
                    bool : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    allowance : async(req, res, next) => {Router
        try{
            const { from, spender } = req.body;

            const result = await DHT20.methods.allowance(from, spender).call()
            
            console.log(result);
            res.status(200).json({
                message : "approve",
                data : {
                    bool : result
                }
            });
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
}

Router.get("/", Controller.getAccounts);
Router.get("/newAccount", Controller.createAccount);
Router.post("/setToken", Controller.setToken);
Router.post("/mintNFT", Controller.mintNFT);
Router.post("/saleNFT", Controller.saleNFT);
Router.post("/buyNFT", Controller.buyNFT);
Router.post("/getAllNftList", Controller.getAllNftList);
Router.post("/getNftOwnerList", Controller.getNftOwnerList);
Router.post("/getSaleAllNftList", Controller.getSaleAllNftList);
Router.post("/getSaleOwnerNftList", Controller.getSaleOwnerNftList);
Router.post("/balanceOf", Controller.balanceOf);
Router.post("/transfer", Controller.transfer);
Router.post("/approve", Controller.approve);
Router.post("/allowance", Controller.allowance);

module.exports = Router;
