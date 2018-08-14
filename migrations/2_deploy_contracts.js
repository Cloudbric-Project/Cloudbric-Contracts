const Cloudbric = artifacts.require("./Cloudbric.sol");
const CloudbricSale = artifacts.require("./CloudbricSale.sol");


module.exports = function(deployer, network, accounts) {
  const owner = accounts[0];
  const admin = accounts[1];
  const fundAddr = accounts[2];

  let cloudbric = null;
  let cloudbricSale = null;


  return deployer.deploy(
    Cloudbric, admin, { from: owner }
  ).then(() => {
    return Cloudbric.deployed().then(instance => {
        cloudbric = instance;
        console.log(`Cloudbric delpoyed at \x1b[36m${cloudbric.address}\x1b[0m`);
    });
  }).then(() => {
    return deployer.deploy(
      CloudbricSale, fundAddr, cloudbric.address, { from: owner }
    ).then(() => {
      return CloudbricSale.deployed().then(instance => {
        cloudbricSale = instance;
        console.log(`CloudbricSale deployed at \x1b[36m${cloudbricSale.address}\x1b[0m`);

        cloudbric.setTokenSaleAmount(instance.address, 0, { from: owner});
      });
    });
  });
}
