require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const { REACT_APP_ALCHEMY_API_URL_SEPOLIA, REACT_APP_PRIVATE_KEY, REACT_APP_ETHERSCAN_API_KEY } =
    process.env

//TODO enable the compiler optimizer and set it to 200 runs
// set localhost as the default network and add the Sepolia test network
// add your etherscan API key for contract verification

module.exports = {
    solidity: {
        version: "0.8.17",        
    },    
}
