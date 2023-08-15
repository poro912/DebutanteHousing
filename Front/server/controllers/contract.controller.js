const Web3 = require('web3');
const Contract = require('web3-eth-contract');
require('dotenv').config;

//@notion web3 설정
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'))
//@notion 721 컨트랙트 설정
const DHT721abi = require("../../contract/artifacts/contracts/DH721.sol/DH721.json")
const abi721 = DHT721abi.abi;
const DHT721 = new web3.eth.Contract(abi721, "0xBc258Df71A6d3a1e5CBb2B10290a9584932517AE");

const DHT20abi = require("../../contract/artifacts/contracts/DH20.sol/DH20.json")
const abi20 = DHT20abi.abi;
const DHT20 = new web3.eth.Contract(abi20, "0x1ABdd514Df2c6536f187c63B9d948912fae0130a");


module.exports = {
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
            res.status(200).send(`New Account Address: ${newAccount.address}`)
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    setToken : async(req,res,next) => {
        try{
            const {tokenAddress} = req.body;
            
            const result = await DHT721.methods.setToken(tokenAddress).send({ from: '0x1440f3B95b1fFf757186287176C957C318093fDd' });
            
            console.log(result);
            res.send(result);
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    mintNFT : async(req, res, next) => {
        try{
            const { recipient, tokenURI, price } = req.body;
            const result = await DHT721.methods.mintNFT(recipient, tokenURI, price).send({ from: recipient });


            console.log(result);
            res.send(result);
        }catch(e){
            console.error(e);
            res.status(500).send(e.message || e);
        }
    },
    balanceOf : async(req, res, next) => {
        try{
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
}
