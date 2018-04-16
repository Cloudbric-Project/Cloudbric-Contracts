
const CloudbricToken = artifacts.require("./CloudbricToken.sol");
const CloudbricTokenSale = artifacts.require("./CloudbricTokenSale.sol");

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0];
  const admin = accounts[1];
  const fundAddr = accounts[2];

  await deployer.deploy(CloudbricToken, admin, { from: owner });
  const cloudbricToken = await CloudbricToken.deployed();

  await deployer.deploy(
    CloudbricTokenSale, fundAddr, cloudbricToken.address, { from: owner }
  );
  const cloudbricTokenSale = await CloudbricTokenSale.deployed();
  await cloudbricToken.setTokenSaleAmount(cloudbricTokenSale.address, 0);
};
