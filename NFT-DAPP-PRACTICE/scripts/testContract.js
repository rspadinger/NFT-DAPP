async function testContract() {
    //TODO provide a second Metamask account address
    let account2Address

    //TODO create an instance of the MyNFT contract - use the address of the contract you
    //deployed to the Sepolia test network in the previous section
    let contract

    //TODO  call the "ownerOf" function on the MyNFT contract and specify
    // the Id of a token that has already been minted
    console.log("The owner of token with Id 1: ")

    //TODO create a filter for the "Transfer" event that searches all events where the "To" address
    // corresponds with the address you specified in the account2Address variable.
    // you can neglect all other event arguments. Below is the signature of the "Transfer" event
    // event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    let filter

    //TODO listen to all events that correspond with the filter you specified above
    // and log all event arguments to the console

    //TODO mint a new NFT to the address specified in the account2Address
    // for the tokenURI, use the URL of the nft-metadata.json file you uploaded to Pinata
    let tokenURI = "https://gateway.pinata.cloud/ipfs/..."

    //TODO get all event logs that correspond with the filter you created above
    // you can either provide a specific block range or use "latest" to specify
    //  the last block that has been added to the blockchain
    let logs
    console.log("Logs: ", logs)
}

testContract()
