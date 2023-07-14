const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs")

const tokenURI = "https://gateway.pinata.cloud/ipfs/QmPzekhpuWN2j5yXome5dJYHy2KYHmPBdZ4qKiNbjgqRpz"

describe("MyNFT contract", function () {
    async function deployContractFixture() {
        const [deployer, user] = await ethers.getSigners()

        const MyNFTFactory = await ethers.getContractFactory("MyNFT", deployer)
        const myNFTContract = await MyNFTFactory.deploy()

        return { myNFTContract, deployer, user }
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { myNFTContract, deployer } = await loadFixture(deployContractFixture)
            expect(await myNFTContract.owner()).to.equal(deployer.address)
        })
    })

    describe("Features of the MyNFT Contract", function () {
        it("Should mint a token to specified address", async function () {
            const { myNFTContract, user } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(user.address, tokenURI)

            expect(await myNFTContract.ownerOf(1)).to.eq(user.address)
        })

        it("Should change token balance of sender after transfer", async function () {
            const { myNFTContract, deployer, user } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(deployer.address, tokenURI)

            await expect(
                myNFTContract["safeTransferFrom(address,address,uint256)"](
                    deployer.address,
                    user.address,
                    1
                )
            ).to.changeTokenBalance(myNFTContract, deployer.address, -1)
        })
    })

    describe("Events", function () {
        it("Should emit the Transfer event on token mint", async function () {
            const { myNFTContract, user } = await loadFixture(deployContractFixture)

            await expect(myNFTContract.mintNFT(user.address, tokenURI))
                .to.emit(myNFTContract, "Transfer")
                .withArgs(ethers.constants.AddressZero, user.address, anyValue) // We accept any value for the tokenId
        })
    })

    describe("Revert", function () {
        it("Should revert with invalid token ID", async function () {
            const { myNFTContract, deployer } = await loadFixture(deployContractFixture)

            await myNFTContract.mintNFT(deployer.address, tokenURI)

            //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/docs-v4.x/contracts/token/ERC721/ERC721.sol : 386
            await expect(myNFTContract.tokenURI(10)).to.be.revertedWith("ERC721: invalid token ID")
        })
    })
})
