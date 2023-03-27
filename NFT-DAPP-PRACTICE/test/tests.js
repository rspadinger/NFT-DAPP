const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")

const tokenURI = "https://gateway.pinata.cloud/ipfs/QmPzekhpuWN2j5yXome5dJYHy2KYHmPBdZ4qKiNbjgqRpz"

describe("MyNFT contract", function () {
    async function deployContractFixture() {
        //TODO get 2 signers :
        //const [deployer, user] = ...

        //TODO deploy the MyNFT.sol contract :
        //const MyNFTFactory = ...
        //const myNFTContract = ...

        return { myNFTContract, deployer, user }
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () { 
            //TODO get the contract and signer (deployer) from the fixture :
            //const { myNFTContract, deployer } = ...

            //TODO make sure, the owner of the contract is the same as the deployer :
            //expect(...)
        })

        it("Should set the right token name", async function () {
            const { myNFTContract } = await loadFixture(deployContractFixture)

            //TODO make sure, the name of the contract is "MyNFT" :
        })
    })

    describe("Features of the MyNFT Contract", function () {
        it("Should mint a token to specified address", async function () {
            const { myNFTContract, user } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(user.address, tokenURI)

            //TODO make sure, the owner of tokenId 1 is user :
        })        

        it("Should return the correct tokenURI", async function () {
            const { myNFTContract, deployer } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(deployer.address, tokenURI)

            //TODO make sure, the tokenURI of the token with Id = 1 corresponds with the value provided for tokenURI :
        })

        it("Should change token balance of sender and receiver after transfer", async function () {
            const { myNFTContract, deployer, user } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(deployer.address, tokenURI)

            //TODO transfer the token with Id = 1 from deployer to user (using safeTransferFrom)
            // and make sure, the token balance of the deployer decreases by 1 and the balance for user increases by 1 :            
        })
    })

    describe("Events", function () {
        it("Should emit the Transfer event on token mint", async function () {
            const { myNFTContract, user } = await loadFixture(deployContractFixture)

            //TODO mint a token to user and make sure, the "Transfer" event is emitted with the following arguments =>
            // from: zero address ; to: user addrss ; value: we know, it is 1, but we want to allow any value here :            
        })
    })

    describe("Revert", function () {
        it("Should revert with invalid token ID", async function () {
            const { myNFTContract, deployer } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(deployer.address, tokenURI)

            //TODO call the "tokenURI" function on the contract with an invalid tokenId and make sure,
            // the function call is reverted witth the following message: "ERC721: invalid token ID" :
        })
    })
})
