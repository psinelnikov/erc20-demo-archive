var ERC20 = artifacts.require('./ERC20.sol');

module.exports = function (deployer) {
	deployer.deploy(
		ERC20,
		'TEST',
		'TC',
		'0x6DcbaFcaaFEBc3e12a4833610511dd26196Aced7'
	);
};
