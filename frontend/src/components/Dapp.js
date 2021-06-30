import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

import { Deposit } from "./Deposit";

export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
    };
  }

  render() {
    return (
      <div>
        <h2>Dapp </h2>
        <Deposit
          depositRemit={(depositor, remitter, password, lockDuration, amount) =>
            this._deposit(depositor, remitter, password, lockDuration, amount)
          }
        />
      </div>
    );
  }

  async _deposit(depoitor, remitter, password, lockDuraiton, amount) {
    try {
      console.log("inside _deposit() ");
    } catch (err) {
      console.error("_deposit::", err);
    } finally {
    }
  }
}
