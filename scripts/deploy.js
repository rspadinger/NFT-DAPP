async function main() {
    const MyNFTFactory = await ethers.getContractFactory("MyNFT")
    const myNFT = await MyNFTFactory.deploy()

    await myNFT.deployed()

    console.log("myNFT deployed to:", myNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
