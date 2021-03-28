import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Web3 from 'web3';
import ERC20Contract from '../contracts/ERC20.json';
import useFormInput from '../components/UseFormInput';

export default function MetaMaskPage() {
	const [web3] = useState(new Web3(window.ethereum));
	const [contract, setContract] = useState(null);
	const [receiverAddress, recieverAddressInput] = useFormInput({
		type: 'text',
		placeholder: 'Enter the receiver address',
	});
	const [receiverBalance, setReceiverBalance] = useState(0);
	const [senderAddress, senderAddressInput, setSenderAddress] = useFormInput({
		type: 'text',
		placeholder: 'Enter the sender address',
	});
	const [senderBalance, setSenderBalance] = useState(0);
	const [amount, amountInput] = useFormInput({
		defaultValue: 1,
		type: 'text',
		placeholder: 'Amount to send',
	});
	const [allowance, setAllowance] = useState(0);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [account] = await web3.eth.getAccounts();
				const network = await web3.eth.net.getId();

				if (ERC20Contract.networks[network]) {
					const contract = new web3.eth.Contract(
						ERC20Contract.abi,
						ERC20Contract.networks[network].address
					);

					setContract(contract);
					setTokenName(await contract.methods.name().call());
					setTokenSymbol(await contract.methods.symbol().call());

					setSenderAddress(account);
					setSenderBalance(
						await contract.methods.balanceOf(account).call()
					);
				} else {
					throw new Error(
						`Contract does not exist for the ${await web3.eth.net.getNetworkType()} network`
					);
				}
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(
					`Failed to load web3, accounts, or contract. Check console for details.`
				);
				console.error(error);
			}
		};

		fetchData();
	}, [web3, setSenderAddress]);

	async function checkBalance() {
		let senderBalance = 0;
		let receiverBalance = 0;
		let message = '';

		if (senderAddress) {
			if (web3.utils.isAddress(senderAddress)) {
				senderBalance = await contract.methods
					.balanceOf(senderAddress)
					.call();
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

		setReceiverBalance(receiverBalance);
		setSenderBalance(senderBalance);
		setMessage(message);
	}

	async function checkAllowance() {
		let allowance = 0;
		let message = '';

		if (senderAddress && receiverAddress) {
			if (
				web3.utils.isAddress(senderAddress) &&
				web3.utils.isAddress(receiverAddress)
			) {
				allowance = await contract.methods
					.allowance(senderAddress, receiverAddress)
					.call();
			} else {
				message =
					'Error: Incorrect ethereum address for the sender or receiver';
			}
		}

		setAllowance(allowance);
		setMessage(message);
	}

	async function sendTransfer() {
		if (senderBalance >= 0) {
			try {
				await contract.methods
					.transfer(receiverAddress, amount)
					.send({ from: senderAddress }, (error, result) => {
						if (error) {
							setMessage('Error: ' + error.message);
						} else {
							setMessage('Transaction Hash: ' + result);
						}
					});
			} catch (error) {
				setMessage('Error: The transfer has failed - ' + error.message);
			}
		}
	}

	async function sendApproval() {
		if (senderBalance >= 0) {
			try {
				await contract.methods
					.approve(receiverAddress, amount)
					.send({ from: senderAddress }, (error, result) => {
						if (error) {
							setMessage('Error: ' + error.message);
						} else {
							setMessage('Transaction Hash: ' + result);
						}
					});
			} catch (error) {
				setMessage('Error: The transfer has failed - ' + error.message);
			}
		}
	}

	async function receiveAllowance() {
		try {
			await contract.methods
				.transferFrom(senderAddress, receiverAddress, amount)
				.send({ from: receiverAddress }, (error, result) => {
					if (error) {
						setMessage('Error: ' + error.message);
					} else {
						setMessage('Transaction Hash: ' + result);
					}
				});
		} catch (error) {
			setMessage('Error: The transfer has failed - ' + error.message);
		}
	}

	return (
		<>
			<Row>
				<Col>
					<h1>{tokenName} Token</h1>
				</Col>
			</Row>
			<Row>
				<Col>{message && <b>{message}</b>}</Col>
			</Row>

			<Form>
				<Row>
					<Col lg={6}>
						<Form.Group controlId="formSenderAddress">
							<Form.Label>Sender Address</Form.Label>
							{senderAddressInput}
						</Form.Group>
					</Col>
					<Col lg={6}>
						<Form.Group controlId="formReceiverAddress">
							<Form.Label>Receiver Address</Form.Label>
							{recieverAddressInput}
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<Form.Label>Amount</Form.Label>
						{amountInput}
					</Col>
					<Col md={3}>
						<Form.Label>Sender Balance</Form.Label>
						<Form.Control
							plaintext
							readOnly
							value={`${senderBalance} ${tokenSymbol}`}
						/>
					</Col>
					<Col md={3}>
						<Form.Label>Receiver Balance</Form.Label>
						<Form.Control
							plaintext
							readOnly
							value={`${receiverBalance} ${tokenSymbol}`}
						/>
					</Col>
					<Col md={3}>
						<Form.Label>Allowance</Form.Label>
						<Form.Control
							plaintext
							readOnly
							value={`${allowance} ${tokenSymbol}`}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={3} className="mt-4">
						<Button
							variant="secondary"
							onClick={checkBalance}
							block
						>
							Check Balance
						</Button>
					</Col>
					<Col md={3} className="mt-4">
						<Button
							variant="secondary"
							disabled={!receiverAddress}
							onClick={checkAllowance}
							block
						>
							Check Allowance
						</Button>
					</Col>
					<Col md={2} className="mt-4">
						<Button
							variant="primary"
							disabled={!receiverAddress}
							onClick={sendTransfer}
							block
						>
							Transfer
						</Button>
					</Col>
					<Col md={2} className="mt-4">
						<Button
							variant="primary"
							disabled={!receiverAddress}
							onClick={sendApproval}
							block
						>
							Approve
						</Button>
					</Col>
					<Col md={2} className="mt-4">
						<Button
							variant="primary"
							disabled={!receiverAddress}
							onClick={receiveAllowance}
							block
						>
							Withdraw
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
