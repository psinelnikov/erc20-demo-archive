import React from 'react';
import Button from 'react-bootstrap/Button';

export default function HomePage() {
	return (
		<>
			<h1>ERC20 Method Mappings</h1>
			<div>
				<dt>
					function balanceOf(address _owner) public view returns
					(uint256 balance)
				</dt>
				<dd>
					<Button variant="secondary">Check Balance</Button>
				</dd>
			</div>
			<div>
				<dt>
					function allowance(address _owner, address _spender) public
					view returns (uint256 remaining)
				</dt>
				<dd>
					<Button variant="secondary">Check Allowance</Button>
				</dd>
			</div>
			<div>
				<dt>
					function transfer(address _to, uint256 _value) public
					returns (bool success)
				</dt>
				<dd>
					<Button variant="primary">Transfer</Button>
				</dd>
			</div>
			<div>
				<dt>
					function transferFrom(address _from, address _to, uint256
					_value) public returns (bool success)
				</dt>
				<dd>
					<Button variant="primary">Withdraw</Button>
				</dd>
			</div>
			<div>
				<dt>
					function approve(address _spender, uint256 _value) public
					returns (bool success)
				</dt>
				<dd>
					<Button variant="primary">Approve</Button>
				</dd>
			</div>
			<div>
				<dt>
					event Transfer(address indexed _from, address indexed _to,
					uint256 _value)
				</dt>
				<dd>Internal to the Contract</dd>
			</div>
			<div>
				<dt>
					event Approval(address indexed _owner, address indexed
					_spender, uint256 _value)
				</dt>
				<dd>Internal to the Contract</dd>
			</div>
		</>
	);
}
