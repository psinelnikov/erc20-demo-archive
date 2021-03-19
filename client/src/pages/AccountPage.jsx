import React, { Component } from 'react';
import { portis, web3 } from '../getWeb3';

class AccountPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			portis: null,
			web3: null,
			accounts: null,
		};
	}

	componentDidMount = async () => {
		try {
			const accounts = await web3.eth.getAccounts();

			this.setState({ portis, web3, accounts });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	};

	render() {
		return this.state.accounts ? (
			<div>Selected Account: {this.state.accounts[0]}</div>
		) : (
			<div>No Account Selected</div>
		);
	}
}

export default AccountPage;
