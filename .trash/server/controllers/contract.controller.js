const Web3 = require('web3');
const Contract = require('web3-eth-contract');
require('dotenv').config;

//@notion web3 설정
//const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
const jsonRpcUrl = `https://sepolia.infura.io/v3/72436c032df149d191383a3b32bdad45`;
const web3 = new Web3(jsonRpcUrl);
//@notion 721 컨트랙트 설정
const DHT721abi = require("../../contract/artifacts/contracts/DH721.sol/DH721.json")
const abi721 = DHT721abi.abi;
const DHT721 = new web3.eth.Contract(abi721, "0xA6021227bb9b2A7aff42C046F32d68be150080b5");
const DHT721Se = new web3.eth.Contract(abi721, "0x84Bb947CFCb2AE9cd47bE0D7489490C6F9AeE3C6");

const DHT20abi = require("../../contract/artifacts/contracts/DH20.sol/DH20.json")
const abi20 = DHT20abi.abi;
const DHT20 = new web3.eth.Contract(abi20, "0x006f96E335DB48C05f1f23D3137b02982b1cef71");
const DHT20Se = new web3.eth.Contract(abi20, "0xE9DC2024e6C63e65A8a481473878803237873797");


module.exports = {
    getAccounts : async(req, res, next) => {
        try {
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            res.status(200).send(accounts);
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
          
		  const userWallet = web3.eth.accounts.privateKeyToAccount("1477052570c06e7a0577249cbb749e0a3b13bf78f5fea982aadc981c170d336d");
		  const connectedContract = DHT721Se.clone();
		  connectedContract.options.address = "0x84Bb947CFCb2AE9cd47bE0D7489490C6F9AeE3C6";
		  connectedContract.options.from = userWallet.address;

		  web3.eth.accounts.wallet.add(userWallet);
		  const result = await DHT721Se.methods.setToken(tokenAddress).send({ from: userWallet.address, gas: 3000000 });	
		  console.log(result);
		  res.send(result);

		} catch (error) {
          //console.error('Transaction error:', error);
          res.status(500).send(error.message || error);
        }
      },
      
    mintNFT: async (req, res, next) => {
        try {
          const { recipient , tokenURI, price } = req.body;
          const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
          const gasLimit = 1000000; // 원하는 가스 리미트 설정
      
          const result = await DHT721.methods
            .mintNFT(recipient, tokenURI, price)
            .send({ from: recipient, gasPrice, gasLimit });
      
          console.log(result);
          res.send(result);
        } catch (e) {
          console.error(e);
          res.status(500).send(e.message || e);
        }
      },
    saleNFT : async (req, res, next) => {
        try {
          const { account, tokenId, price } = req.body;
      
          const result = await DHT721.methods.saleNFT(tokenId, price).send({ from: account });
      
          console.log(result);
          res.send(result);
        } catch (e) {
          console.error(e);
          res.status(500).send(e.message || e);
        }
      },
      buyNFT : async (req, res, next) => {
        try {
          const { account, tokenId } = req.body;
          const gasPrice = web3.utils.toWei('100', 'gwei'); // 원하는 가스 가격 설정
          const gasLimit = 1000000; // 원하는 가스 리미트 설정
      
          const result = await DHT721.methods.buyNFT( tokenId ).send({ from: account, gasPrice, gasLimit  });
      
          console.log(result);
          res.send(result);
        } catch (e) {
          console.error(e);
          res.status(500).send(e.message || e);
        }
      },
      
    getAllNftList : async(req, res, next) => {
        try{
            const result = await DHT721Se.methods.getAllNftList().call()
            
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
            const { account } = req.body;

            const result = await DHT20Se.methods.balanceOf(account).call()
            
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
            const { from, recipient, amount } = req.body;

            const result = await DHT20.methods.transfer(recipient, amount).send({ from: from })
            
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
            const { from, spender, amount } = req.body;

            const result = await DHT20.methods.approve(spender, amount).send({ from: from })
            
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
    allowance : async(req, res, next) => {
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
