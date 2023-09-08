require("@nomicfoundation/hardhat-toolbox");

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
  },
};
