import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { portis, web3 } from '../getWeb3';

class TransferPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			portis: null,
			web3: null,
			accounts: null,
			contract: null,
			receiverAddress: '',
			receiverBalance: 0,
			senderAddress: '',
			senderBalance: 0,
		};
	}

	activateMenu = () => {
		portis.showPortis();
	};

	checkBalance = async () => {
		let senderBalance = 0;
		let receiverBalance = 0;
		let message = '';

		if (web3.utils.isAddress(this.state.senderAddress)) {
			senderBalance = web3.utils.fromWei(
				await web3.eth.getBalance(this.state.senderAddress)
			);
		} else {
			message = 'Error: Incorrect ethereum address for the sender';
		}

		if (this.state.receiverAddress) {
			if (web3.utils.isAddress(this.state.receiverAddress)) {
				receiverBalance = web3.utils.fromWei(
					await web3.eth.getBalance(this.state.receiverAddress)
				);
			} else {
				message = 'Error: Incorrect ethereum address for the receiver';
			}
		}

		this.setState({ senderBalance, receiverBalance, message });
	};

	sendTransfer = async () => {
		if (this.state.senderBalance >= 0) {
			try {
				// await TransactionContract.methods
				// 	.transferFunds(this.state.receiverAddress)
				// 	.send(
				// 		{
				// 			from: this.state.senderAddress,
				// 			value: web3.utils.toWei(this.state.amount.toString(), 'ether'),
				// 		},
				// 		(error, result) => {
				// 			if (error) {
				// 				this.setState({ message: 'Error: ' + error.message });
				// 			} else {
				// 				this.setState({
				// 					message: 'Transaction Hash: ' + result,
				// 				});
				// 			}
				// 		}
				// 	);
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
		return (
			<>
				<Row>
					<Col md={8}>{this.state.message && <b>{this.state.message}</b>}</Col>
					<Col md={4} className="mb-2">
						<Button variant="secondary" onClick={this.activateMenu} block>
							Portis Menu
						</Button>
					</Col>
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
									className="u-full-width"
									placeholder="Loading..."
									disabled
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
									className="u-full-width"
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
								defaultValue={this.state.receiverBalance + ' ETH'}
							/>
						</Col>
						<Col md={3}>
							<Form.Label>Receiver Balance</Form.Label>
							<Form.Control
								plaintext
								readOnly
								defaultValue={this.state.receiverBalance + ' ETH'}
							/>
						</Col>
					</Row>
					<Row>
						<Col md={6} className="mt-4">
							<Button variant="secondary" onClick={this.checkBalance} block>
								Check Balance
							</Button>
						</Col>
						<Col md={6} className="mt-4">
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

export default TransferPage;
