import React from 'react';

export default function Footer() {
	return (
		<footer className="p-4 text-center">
			<div>
				Page Layout and Functionality created by{' '}
				<a href="https://github.com/pavelsinelnikov">
					Pavel Sinelnikov
				</a>
			</div>
			<div>
				Used{' '}
				<a href="https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20">
					OpenZeppelin's ERC-20 Smart Contract Implementation
				</a>
			</div>
		</footer>
	);
}
