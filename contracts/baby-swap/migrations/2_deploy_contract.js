const BabySwap = artifacts.require("BabySwap");

module.exports = async function(deployer) {
  // Deploy BabySwap
  await deployer.deploy(BabySwap);
}