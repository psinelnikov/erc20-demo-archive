# ERC-20 Demo

## What you Need

-   [Nodejs](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/getting-started/install/)
-   [Ganache](https://www.trufflesuite.com/ganache/)
-   Truffle - `npm install -g truffle`
-   [Portis Account](https://portis.io/)
-   [Metamask Account](https://metamask.io/)
-   [Infura Account](https://infura.io/) - Only if deploying on the Official Testnet/Mainnet (e.g. Ropsten, Rinkeby, etc.)

## How to use the Template

-   Navigate to the `migrations/2_deploy_erc20.js` file and replace the Address with the address that you own
-   In the `client/src/` folder add the Portis API key to the `default.env` and rename the file to `.env`

**Note**: You must get Test Ether for the platform you are using in order to change contract data. use the Remote Test Node

### Remote Test Node (https://sinelnikov.ca/ganache)

1. Deploy the Contract using: `truffle deploy --network development`
2. In a seperate Terminal, start the client: `yarn start`, you should see a React Page launch

**Note**: You cannot send your Test ERC-20 Tokens until you add Test Ether to your account. To do that you must:

3. Navigate to https://sinelnikov.ca/projects/faucet
4. Paste in your address and click `Send Test Ether`

You can now interact with the application. Read the Home Page for more details regarding the functionality of the ERC-20 Token Smart Contract

### Local Server (localhost)

1. Start the Ganache Server (see instructions on the Trufflesuite Website)
2. In a separate Terminal, deploy the Contract to the Ganache Server: `truffle deploy --network development`
3. In a seperate Terminal, start the client: `yarn start`, you should see a React Page launch
4. Import a Generated Ganache Test account by the Private key into the MetaMask wallet
5. Switch the network to be localhost:8545 (You should see the account contain about 100 Eth)
6. Send the 1 Ether to your original account
7. Switch to your original account

You can now interact with the application. Read the Home Page for more details regarding the functionality of the ERC-20 Token Smart Contract

### Using the Ropsten Testnet (Infura)

1. Add the `.secret` file and insert your mnemonic seed phrase
2. Add the `.infura` file and insert the link to your Infura project
3. In a separate Terminal, deploy the Contract to the Ganache Server: `truffle deploy --network ropsten`
4. In a seperate Terminal, start the client: `yarn start`, you should see a React Page launch
5. Go to the [Ropsten Faucet](https://faucet.ropsten.be/) and enter your address and click `Send me test Ether`

You can now interact with the application. Read the Home Page for more details regarding the functionality of the ERC-20 Token Smart Contract
