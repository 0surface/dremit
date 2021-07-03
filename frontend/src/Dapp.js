import React from "react";
import { ethers } from "ethers";
import { Deposit } from "./components/Deposit";

import { useContractLoader } from "./hooks";

function Dapp(props) {
  const localProvider = "";
  const readContracts = useContractLoader(localProvider);

  return (
    <div>
      <h2>Dapp </h2>
      <Deposit depositRemit={(args) => this._deposit(args)} />
    </div>
  );
}

const _deposit = async (args) => {
  try {
    console.log("inside _deposit() ");
    console.log("_deposit() args:  ", args);
  } catch (err) {
    console.error("_deposit::", err);
  } finally {
  }
};

export default Dapp;
