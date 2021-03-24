import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Web3 from 'web3';
import ERC20Contract from '../contracts/ERC20.json';

export default class MetaMaskPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			web3: null,
			contract: null,
			receiverAddress: '',
			receiverBalance: 0,
			senderAddress: '',
			senderBalance: 0,
			amount: 0,
			tokenName: '',
			tokenSymbol: '',
		};
	}

	checkBalance = async () => {
		const { web3, senderAddress, receiverAddress, contract } = this.state;
		let senderBalance = 0;
		let receiverBalance = 0;
		let message = '';

		if (senderAddress) {
			if (web3.utils.isAddress(senderAddress)) {
				senderBalance = await contract.methods.balanceOf(senderAddress).call();
			} else {
				message = 'Error: Incorrect ethereum address for the sender';
			}
		}

		if (receiverAddress) {
			if (web3.utils.isAddress(receiverAddress)) {
				receiverBalance = await contract.methods
					.balanceOf(receiverAddress)
					.call();
			} else {
				message = 'Error: Incorrect ethereum address for the receiver';
			}
		}

		this.setState({ senderBalance, receiverBalance, message });
	};

	sendTransfer = async () => {
		const {
			web3,
			senderAddress,
			senderBalance,
			receiverAddress,
			amount,
			contract,
		} = this.state;

		if (senderBalance >= 0) {
			try {
				await contract.methods.transfer(receiverAddress).send(
					{
						from: senderAddress,
						value: web3.utils.toWei(amount.toString(), 'ether'),
					},
					(error, result) => {
						if (error) {
							this.setState({ message: 'Error: ' + error.message });
						} else {
							this.setState({
								message: 'Transaction Hash: ' + result,
							});
						}
					}
				);
			} catch (error) {
				this.setState({ message: 'Error: The transfer has failed' });
			}
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	componentDidMount = async () => {
		try {
			const web3 = new Web3(window.ethereum);
			const [senderAddress] = await web3.eth.getAccounts();
			const network = await web3.eth.net.getId();
			const contract = new web3.eth.Contract(
				ERC20Contract.abi,
				ERC20Contract.networks[network].address
			);
			const tokenName = await contract.methods.name().call();
			const tokenSymbol = await contract.methods.symbol().call();

			this.setState({ web3, senderAddress, contract, tokenName, tokenSymbol });
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`
			);
			console.error(error);
		}
	};

	render() {
		return (
			<>
				<Row>
					<Col>
						<h1>{this.state.tokenName} Token</h1>
					</Col>
				</Row>
				<Row>
					<Col>{this.state.message && <b>{this.state.message}</b>}</Col>
				</Row>

				<Form>
					<Row>
						<Col md={6}>
							<Form.Group controlId="formSenderAddress">
								<Form.Label>Sender Address</Form.Label>
								<Form.Control
									name="senderAddress"
									value={this.state.senderAddress}
									type="text"
									placeholder="Enter the sender address"
									required
									onChange={this.onChange}
								/>
							</Form.Group>
						</Col>
						<Col md={6}>
							<Form.Group controlId="formReceiverAddress">
								<Form.Label>Receiver Address</Form.Label>
								<Form.Control
									name="receiverAddress"
									value={this.state.receiverAddress}
									type="text"
									placeholder="Enter the receiver address"
									required
									onChange={this.onChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Form.Label>Amount</Form.Label>
							<Form.Control
								name="amount"
								value={this.state.amount}
								type="text"
								className="u-full-width"
								placeholder="Amount to send"
								required
								onChange={this.onChange}
							/>
						</Col>
						<Col md={3}>
							<Form.Label>Sender Balance</Form.Label>
							<Form.Control
								plaintext
								readOnly
								value={`${this.state.senderBalance} ${this.state.tokenSymbol}`}
							/>
						</Col>
						<Col md={3}>
							<Form.Label>Receiver Balance</Form.Label>
							<Form.Control
								plaintext
								readOnly
								value={`${this.state.receiverBalance} ${this.state.tokenSymbol}`}
							/>
						</Col>
					</Row>
					<Row>
						<Col md={6} className="mt-4">
							<Button variant="secondary" onClick={this.checkBalance} block>
								Check Balance
							</Button>
						</Col>
						<Col md={3} className="mt-4">
							<Button
								variant="primary"
								disabled={!this.state.receiverAddress}
								onClick={this.sendTransfer}
								block
							>
								Allow
							</Button>
						</Col>
						<Col md={3} className="mt-4">
							<Button
								variant="primary"
								disabled={!this.state.receiverAddress}
								onClick={this.sendTransfer}
								block
							>
								Transfer
							</Button>
						</Col>
					</Row>
				</Form>
			</>
		);
	}
}
