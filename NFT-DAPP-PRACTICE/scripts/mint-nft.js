const { VITE_PRIVATE_KEY, VITE_PRIVATE_KEY2, VITE_CONTRACT_ADDRESS, VITE_CONTRACT_ADDRESS_LOCAL } =
    process.env

// nft-metadata.json uploaded to Pinata => contains 2 properties and an image url (also uploaded to Pinata)
const tokenURI = "https://gateway.pinata.cloud/ipfs/QmPzekhpuWN2j5yXome5dJYHy2KYHmPBdZ4qKiNbjgqRpz"

let provider, signer, signer2, contract, txn, txnReceipt

async function main() {
    //TODO set the provider and retrive network details => in order to acces the correct chainId :
    //provider = ...
    //const currentNetwork = ...

    if (currentNetwork.chainId.toString().includes(1337)) {
        console.log("We are using a local network!")
        //TODO create an instance of the NFT contract that has been deployed locally :
        //contract = ...

        //TODO get the first 2 signers :
        //;[signer, signer2] = ...
    } else {
        console.log("We are using a remote network!")
        //TODO create an instance of the NFT contract that has been deployed to the Sepolia network :
        //contract = ...

        //TODO create 2 wallet signers from the 2 private keys specified in the .env file :
        //signer = ...
        //signer2 = ...
    }

    //TODO mint an NFT to signer2
    // make sure to wait for the transaction to be included in a block (txn.wait()) before continuing :

    //TODO display how many NFT's (of this specific contract) are owned by the recipient :
    //console.log("Number of NFT's owned by the recipient: ", ... )

    //TODO display the owner of NFT with Id = 1 :
    //console.log("Owner of NFT with Id 1: ", ...)

    //transfer NFT with Id = 1 to another account => swap signer and signer2 on
    //the method call below. If we want to transfer it back, we also need to
    //change the signer => safeTransfer requires : from == owner && msg.sender == owner
    contract = await contract.connect(signer2)

    //TODO transfer NFT with Id = 1 from signer2 to signer - use the "safeTransferFrom" method
    //careful, safeTransferFrom is defined several times in the inheritance hierarchy => you need to call the
    //method by specifying the correct function signature: contract["safeTransferFrom(address,..."](arg1,...) :
    //txn = await ...
    //txnReceipt = await txn.wait()

    //TODO display the new owner of the NFT with Id = 1 :
    //console.log("New owner of NFT with Id 1: ", ...)
}

main()
