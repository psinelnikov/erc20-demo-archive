import Web3 from 'web3';
import Portis from '@portis/web3';

export const portis = new Portis(
	process.env.REACT_APP_PORTIS_API_KEY,
	'ropsten'
);

export const web3 = new Web3(portis.provider);
