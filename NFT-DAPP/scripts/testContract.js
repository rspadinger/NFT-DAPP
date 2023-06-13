async function testContract() {
    let account2Address = "0x46f98920c5896eff11bb90d784d6d6001d74c073"

    let contract = await ethers.getContractAt("MyNFT", "0xd79bbc24875735C43eA1f32519Dd09281260a3AD")

    // call a read-only function
    console.log("The owner of token with Id 1: ", await contract.ownerOf(1))

    // filter all logs where 'to' address == account2Address - null means: any match
    // event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    let filter = contract.filters.Transfer(null, account2Address, null)

    // listen to events that correspond with the specified filter
    contract.on(filter, (from, to, tokenId, event) => {
        //console.log("New event emitted: ", event)
        console.log("Emitted event arguments: ", from, to, tokenId)
    })

    // call a write function => mint a new NFT => emits the Transfer event
    let tokenURI =
        "https://gateway.pinata.cloud/ipfs/QmPzekhpuWN2j5yXome5dJYHy2KYHmPBdZ4qKiNbjgqRpz"
    let txn = await contract.mintNFT(account2Address, tokenURI)
    let txnReceipt = await txn.wait()

    // return all logs (fromBlock - toBlock) for the filter defined above
    let logs = await contract.queryFilter(filter, "latest", "latest")
    console.log("Logs: ", logs)
}

testContract()
