const { VITE_PRIVATE_KEY, VITE_PRIVATE_KEY2, VITE_CONTRACT_ADDRESS, VITE_CONTRACT_ADDRESS_LOCAL } =
    process.env

// nft-metadata.json uploaded to Pinata => contains 2 properties and an image url (also uploaded to Pinata)
const tokenURI = "https://gateway.pinata.cloud/ipfs/QmPzekhpuWN2j5yXome5dJYHy2KYHmPBdZ4qKiNbjgqRpz"

let provider, signer, signer2, contract, txn, txnReceipt

async function main() {
    provider = ethers.provider
    const currentNetwork = await provider.getNetwork()

    if (currentNetwork.chainId.toString().includes(1337)) {
        console.log("We are using a local network!")
        contract = await ethers.getContractAt("MyNFT", VITE_CONTRACT_ADDRESS_LOCAL)
        ;[signer, signer2] = await ethers.getSigners()
    } else {
        console.log("We are using a remote network!")
        contract = await ethers.getContractAt("MyNFT", VITE_CONTRACT_ADDRESS)
        ;[signer] = await ethers.getSigners()
        //we could also use the following:
        //signer = new ethers.Wallet(VITE_PRIVATE_KEY, provider)
        signer2 = new ethers.Wallet(VITE_PRIVATE_KEY2, provider)
    }

    // mint an NFT to signer2
    txn = await contract.mintNFT(signer2.address, tokenURI)
    txnReceipt = await txn.wait()

    // display how many NFT's (of this specific contract) are owned by the recipient
    console.log(
        "Number of NFT's owned by the recipient: ",
        await contract.balanceOf(signer2.address)
    )

    // display the owner of NFT with Id = 1
    console.log("Owner of NFT with Id 1: ", await contract.ownerOf(1))

    // transfer NFT with Id = 1 to another account => swap signer and signer2 on
    //the method call below. If we want to transfer it back, we also need to
    //change the signer => safeTransfer requires :: from == owner &&
    //msg.sender == owner
    contract = await contract.connect(signer2)

    //use this on methods with the same name
    txn = await contract["safeTransferFrom(address,address,uint256)"](
        signer2.address,
        signer.address,
        1
    )
    txnReceipt = await txn.wait()

    console.log("New owner of NFT with Id 1: ", await contract.ownerOf(1))
}

main()
