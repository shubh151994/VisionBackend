const Media = artifacts.require("Media");

module.exports = function (deployer)
 { 
    const marketcontract = "0xb65de4d613575074098832Cde8E27537B982Ad02";
  deployer.deploy(Media,marketcontract);
};