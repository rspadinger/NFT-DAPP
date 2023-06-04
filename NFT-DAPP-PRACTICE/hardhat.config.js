require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const { VITE_ALCHEMY_API_URL, VITE_PRIVATE_KEY, VITE_ETHERSCAN_API_KEY } = process.env

//TODO enable the compiler optimizer and set it to 200 runs
// set localhost as the default network and add the Sepolia test network
// add your etherscan API key for contract verification

module.exports = {
    solidity: {
        version: "0.8.19",
    },
}
