import Portis from '@portis/web3';

const ganache = {
	nodeUrl: 'http://localhost:8545',
	chainId: 5777,
};

export default new Portis(process.env.REACT_APP_PORTIS_API_KEY, ganache);
