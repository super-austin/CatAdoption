var User = artifacts.require("./user.sol");

module.exports = function (deployer) {
  deployer.deploy(User);
};
