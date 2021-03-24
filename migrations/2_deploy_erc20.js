var ERC20 = artifacts.require('./ERC20.sol');

module.exports = function (deployer) {
	deployer.deploy(
		ERC20,
		'TEST',
		'TC',
		'0x88cb245f9305a87ebd304b6ef36cbe85e0212e0a'
	);
};
