const path = require('path');
var Web3 = require('web3');
var sinelnikovProvider = new Web3.providers.HttpProvider(
	'https://sinelnikov.ca/ganache'
);
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync('.secret').toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
	throw new Error('unable to retrieve mnemonic from .secret');
}

const infuriaURL = fs.readFileSync('.infura').toString().trim();

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		development: {
			host: '127.0.0.1',
			port: 8545,
			network_id: '*',
		},
		localnet: {
			provider: sinelnikovProvider,
			network_id: '*',
		},
		ropsten: {
			provider: function () {
				return new HDWalletProvider(mnemonic, infuriaURL);
			},
			network_id: 3,
		},
	},
	compilers: {
		solc: {
			version: '^0.8.0',
		},
	},
};
