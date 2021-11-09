const BabyCoin = artifacts.require("BabyCoin");

module.exports = async function(deployer) {
  // Deploy BabyCoin
  await deployer.deploy(BabyCoin);
  const babyCoin = await BabyCoin.deployed();
  await babyCoin.addHolder("0x9c5b5C31744107Bca4887115c1077aa1DbFeb139");
}