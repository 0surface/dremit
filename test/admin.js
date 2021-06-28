const { expect } = require("chai");

let Remit, remittance, deployer, sender, remitter;

beforeEach('', async () =>{
    Remit = await ethers.getContractFactory("Remittance");
    [deployer, sender, remitter, ...accounts] = await ethers.getSigners();

    remittance = await Remit.deploy();
    await remittance.deployed();
});

describe('Deployment', () => {
    it('Should set the right owner', async () => {
        expect(await remittance.owner()).to.equal(deployer.address);
    });   
    
});
