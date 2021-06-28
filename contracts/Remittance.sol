//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Remittance is Pausable, Ownable {
    uint constant public MAX_DURATION = 3153600000; //100 years
    uint constant public MIN_DURATION = 0;
    bytes32 constant NULL_BYTES32 = bytes32(0); 

    struct Remit {        
        uint amount;
        uint deadline;
        address depositor;
    }

    mapping(bytes32 => Remit) public ledger;

    event LogDeposited(address indexed depositor, bytes32 indexed key, uint deposited, uint withdrawalDeadline);
    event LogWithdrawal(address indexed withdrawer, bytes32 indexed key, uint withdrawn, bytes32 receiverPassword);    
    event LogRefund(address indexed refundee, bytes32 indexed key, uint refunded);

    function generateKey(address remitterAddresss, bytes32 receiverPassword)
        view public
        whenNotPaused
        returns (bytes32 remitKey)
    {
        require(remitterAddresss != address(0), "Remittance::generateKey:Remitter address cannot be null");
        require(receiverPassword != NULL_BYTES32, "Remittance::generateKey:Remitter password can not be empty");
        return keccak256(abi.encodePacked(receiverPassword, remitterAddresss, this));
    }


}