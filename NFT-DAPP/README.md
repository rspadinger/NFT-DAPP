# NFT DAPP

## Dependencies

Install the following tools:

-   Node.js & NPM: https://nodejs.org
-   Hardhat: https://hardhat.org/hardhat-runner/docs/getting-started
-   Metamask: https://metamask.io/download/
-   Ganache (optional): https://trufflesuite.com/ganache/

Optionally, create an account on the following sites:

-   Alchemy (third party node provider): https://auth.alchemyapi.io/signup
-   Pinata (web3 media management): https://www.pinata.cloud/

## Step 1. Clone the project

`git clone https://github.com/rspadinger/NFT-DAPP.git`

## Step 2. Install dependencies

```
`$ cd project_folder` => (replace project_folder with the name of the folder where the downloaded project files are located: ?:\?\...\NFT-DAPP )
`$ npm install`
```

## Step 3. Start a local blockchain

Either start Ganache or the local blockchain provided by Hardhat.

To run a local Hardhat node, open a command window, select a directory where Hardhat is installed (cd myHardhatFolder...) and run the command:

`$ npx hardhat node`

## Step 4. Create a .env file

Every project requires a .env file with various environment variables (not all of them are required for every project).
The environment variables are the same for a React project and a project that contains a simple script file.
However, in a React project, the name of the environment variable requires the following prefix: VITE_ (see below)

Here are the required environment variables:

//For a React app:

VITE_ALCHEMY_API_URL = "https://eth-rinkeby.alchemyapi.io/v2/REPLACE_WITH_YOUR_API_KEY"
VITE_ALCHEMY_API_KEY = "REPLACE_WITH_YOUR_API_KEY"
VITE_PRIVATE_KEY = "YOUR PRIVATE KEY FROM A METAMASK ACCOUNT"
VITE_PRIVATE_KEY2 = "YOUR PRIVATE KEY FROM A DSECOND METAMASK ACCOUNT"

VITE_CONTRACT_ADDRESS = ADDRESS_OF_CONTRACT_DEPLOYED_TO_SEPOLIA
VITE_CONTRACT_ADDRESS_LOCAL = ADDRESS_OF_CONTRACT_DEPLOYED_TO_HARDHAT_OR_GANACHE

VITE_PINATA_KEY = "YOUR_PINATA_KEY"
VITE_PINATA_SECRET = "YOUR_PINATA_SECRET"

//For a simple script:

ALCHEMY_API_URL_RINKEBY = "https://eth-rinkeby.alchemyapi.io/v2/REPLACE_WITH_YOUR_API_KEY"
ALCHEMY_API_KEY_RINKEBY = "REPLACE_WITH_YOUR_API_KEY"
PRIVATE_KEY = "YOUR PRIVATE KEY FROM A METAMASK ACCOUNT"
PRIVATE_KEY2 = "YOUR PRIVATE KEY FROM A DSECOND METAMASK ACCOUNT"

CONTRACT_ADDRESS = ADDRESS_OF_CONTRACT_DEPLOYED_TO_SEPOLIA
CONTRACT_ADDRESS_LOCAL = ADDRESS_OF_CONTRACT_DEPLOYED_TO_HARDHAT_OR_GANACHE

PINATA_KEY = "YOUR_PINATA_KEY"
PINATA_SECRET = "YOUR_PINATA_SECRET"

## Step 5. Deploy the Smart Contract

The deployment script is located at: scripts/deploy.js

-   To deploy the SC to a local blockchain, open a command window and type: `$npx hardhat run scripts/deploy.js`
-   To deploy the SC to a remote blockchain (for example: sepolia), open a command window and type: npx hardhat run `$scripts/deploy.js --network sepolia`

## Step 6. Run the Script or Application

To run the React web application, open a command windom, navigate to the project folder and type:

`$ npm start`

The applicattion should open in your browser at: http://localhost:3000

To execute the script file, open a command windom, navigate to the project folder and type:

`$ npx hardhat run scripts/mint-nft.js`
