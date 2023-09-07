require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths:{
    artifacts: "./artifacts"
  },
  networks: {
    ganache: {
      url: 'http://127.0.0.1:7545',
      network_id: '*',
      gas: 8000000,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.SERVER_PRIVATE_KEY],
    },

  },
};
