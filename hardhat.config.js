require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const { REACT_APP_ALCHEMY_API_URL_GOERLI, REACT_APP_PRIVATE_KEY } = process.env

module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "localhost",
    networks: {
        goerli: {
            url: REACT_APP_ALCHEMY_API_URL_GOERLI,
            accounts: [`0x${REACT_APP_PRIVATE_KEY}`],
        },
    },
}
