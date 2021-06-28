const {expect, assert} = require("chai");
const { toBytes } = require("../utils/util");
const { BigNumber } = require("ethers");

const _sent = 20;
const gas = 4000000;
const _depositLockDuration = 86400;
const _randomRemitKey = "0x72631ef6a9de404af013211acf2bec80a2d1c9c0b799846fea429a55bf864ee8";
const _nullHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

let Remit, remittance, deployer, sender, remitter;


describe('Basic Deposit tests', () => {

beforeEach('Deploy fresh contract, get signers', async() => {
    Remit = await ethers.getContractFactory("Remittance");
    [deployer, sender, remitter, ...accounts] = await ethers.getSigners();
    remittance = await Remit.deploy();
    await remittance.deployed();
});

    it('should emit an event with correct arguments', async() => {               
        const depositTxObj = await remittance
            .connect(sender)
            .deposit(_randomRemitKey, _depositLockDuration, {value: _sent, gasPrice: gas} );
        
        const depositBlock = await ethers.provider.getBlock(depositTxObj.blockNumber);
        const expectedDeadline = depositBlock.timestamp + _depositLockDuration;

        await expect(depositTxObj)
            .to.emit(remittance, 'LogDeposited')
            .withArgs( 
                sender.address, 
                _randomRemitKey,
                _sent, 
                parseInt(expectedDeadline));
    });
    
    it('should record sent amount as owed in storage', async() => {
        const expectedAmount = _sent;
        const remitBefore = await remittance.ledger(_randomRemitKey);
        

        const depositTx = await remittance
                .connect(sender)
                .deposit(_randomRemitKey, _depositLockDuration, {value: _sent, gasPrice: gas} );
        await depositTx.wait();

        const remitAfter = await remittance.ledger(_randomRemitKey);
        const actualAmount = remitAfter.amount.sub(remitBefore.amount).toNumber();
        expect(actualAmount).to.equal(expectedAmount);
        expect(sender.address).to.equal(remitAfter.depositor);
    });

    it('should revert if given null remitkey', async() => {
        await expect(
            remittance
                .connect(sender)
                .deposit(_nullHash, _depositLockDuration, {value:_sent})
        )
        .to.be.revertedWith("Remittance::deposit:Invalid remitKey value");
    });

    it('should revert if deposit amount is 0', async() => {
        await expect(
            remittance
                .connect(sender)
                .deposit(_randomRemitKey, _depositLockDuration, {value:0})
        )
        .to.be.revertedWith("Remittance::deposit:Invalid minimum deposit amount");
    });

    it('should revert if deposit lock duration is 0', async() => {
        const minValue = await remittance.MIN_DURATION();
        
        await expect(
            remittance
                .connect(sender)
                .deposit(_randomRemitKey, minValue, {value: _sent})
        )
        .to.be.revertedWith("Remittance::deposit:Invalid minumum lock duration");        
    });

    it('should revert if deposit lock duration is above maximum allowed', async() => {
        const maxValue = await remittance.MAX_DURATION();
      const aboveMaxValue = maxValue.add(BigNumber.from(1));
      await expect(
        remittance
            .connect(sender)
            .deposit(_randomRemitKey, aboveMaxValue, {value: _sent})
    )
    .to.be.revertedWith("Remittance::deposit:Invalid maximum lock duration");
    });

    it('should revert when given an active deposit key', async() => {
       const depositTxObj = await remittance
       .connect(sender)
       .deposit(_randomRemitKey, _depositLockDuration, {value: _sent});
       await depositTxObj.wait();

       expect(
           remittance
           .connect(sender)
           .deposit(_randomRemitKey, _depositLockDuration, {value: _sent, gasPrice: gas})
       )
       .to.be.revertedWith("Invalid, remit Key has an active deposit")
    });    
});


describe('Deposit with active/passowrd reuse denial test (in steps)', () => {
    const receiverPassword = "abcdef";
    let _key_1 = "";

    it('should deploy contract first', async() => {
        Remit = await ethers.getContractFactory("Remittance");
        [deployer, sender, remitter, ...accounts] = await ethers.getSigners();
        remittance = await Remit.deploy();
        await remittance.deployed();
    });
    
    it('should generate key', async() => {
        _key_1 = await remittance.generateKey(remitter.address, toBytes(receiverPassword));
        console.log("_key_1", _key_1);
    });

    it('should deposit first time', async() => {
        const depositTxObj = await remittance
            .connect(sender)
            .deposit(_key_1, _depositLockDuration, {value: _sent});
        
        await depositTxObj.wait();

        assert.isDefined(depositTxObj);
    });

    // it('should withdraw first deposit', async() => {
        
    // });

     // it('should revert when given an active deposit key', async() => {
        
    // });
    
});
