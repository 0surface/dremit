const {expect, assert} = require("chai");
const { BigNumber } = require("ethers");
const { toBytes, evm_increaseTime } = require("../utils/util");

let Remit, remittance, deployer, sender, remitter, _remitKey_;
const _nullKey = "0x0000000000000000000000000000000000000000000000000000000000000000";
const _withdrawalDeadline = 86400;
const receiverPassword = "abcdef";
const gas = 4000000;
const _sent = 20;
