var Cat = artifacts.require("./cat.sol");

module.exports = function (deployer) {
  deployer.deploy(Cat);
};
