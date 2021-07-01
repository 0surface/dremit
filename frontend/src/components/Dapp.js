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
        <Deposit depositRemit={(args) => this._deposit(args)} />
      </div>
    );
  }

  async _deposit(args) {
    try {
      console.log("inside _deposit() ");
      console.log("args:  ", args);
    } catch (err) {
      console.error("_deposit::", err);
    } finally {
    }
  }
}
