import Portis from '@portis/web3';

const ganache = {
	nodeUrl: 'https://sinelnikov.ca/ganache',
	chainId: '*',
};

export default new Portis(process.env.REACT_APP_PORTIS_API_KEY, ganache);
