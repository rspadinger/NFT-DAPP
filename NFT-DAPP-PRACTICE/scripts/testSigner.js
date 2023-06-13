async function testSigner() {
    let provider = ethers.provider

    //TODO get a signer instance
    let signer

    //TODO specify another Metmask account address
    let account2Address

    //TODO get the address of the signer
    console.log("Signer address: ")

    //TODO get the balance of the signer account
    console.log("Balance: ")

    console.log(
        "Balance before sending 0.1 ETH: ",
        ethers.utils.formatEther(await provider.getBalance(account2Address))
    )

    txnParams = {
        to: account2Address,
        value: ethers.utils.parseEther("0.1"),
    }

    //TODO send a transaction using the 'txnParams' transaction object

    console.log(
        "Balance after sending 0.1 ETH: ",
        ethers.utils.formatEther(await provider.getBalance(account2Address))
    )
}

testSigner()
