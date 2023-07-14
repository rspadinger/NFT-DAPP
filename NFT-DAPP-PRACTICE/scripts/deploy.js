const fs = require("fs")

async function main() {
    const MyNFTFactory = await ethers.getContractFactory("MyNFT")
    const myNFT = await MyNFTFactory.deploy()

    await myNFT.deployed()

    console.log("myNFT deployed to:", myNFT.address)

    const data = {
        address: myNFT.address,
        abi: JSON.parse(myNFT.interface.format("json")),
    }

    //writes the ABI and address to the MyNFT.json
    fs.writeFileSync("./src/MyNFT.json", JSON.stringify(data))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
