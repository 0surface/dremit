import React, { useState } from "react";
import { ethers } from "ethers";
import { Deposit } from "./components/Deposit";
import { INFURA_ID, NETWORK, NETWORKS } from "./constants";
import { useContractLoader, useUserSigner } from "./hooks";
import { getContractFactory } from "hardhat-deploy-ethers/dist/src/types";

const DEBUG = true;

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.localhost;
// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl;
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new ethers.providers.StaticJsonRpcProvider(
  localProviderUrlFromEnv
);

function Dapp(props) {
  const [address, setAddress] = useState();
  const [injectedProvider, setInjectedProvider] = useState();

  const userSigner = useUserSigner(injectedProvider, localProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId =
    localProvider && localProvider._network && localProvider._network.chainId;

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, {
    chainId: localChainId,
  });

  const _deposit = async (args) => {
    try {
      console.log("inside _deposit() ");
      console.log("_deposit() args:  ", args);

      console.log("readContracts:  ", readContracts);
      console.log("writeContracts:  ", writeContracts);

      // const result = await writeContracts.Remittance.deposit(
      //   args.password,
      //   args.lockDuration
      // );
      // console.log("result: ", result);

      //localStorage.setItem({});
    } catch (err) {
      console.error("_deposit::", err);
    } finally {
      await _testfn();
    }
  };

  const _testfn = async () => {
    // const _contract = await getContract("<deploymentName>");
    // console.log("contract", _contract);
    // const Remit = await getContractFactory("Remittance");
    // console.log("Remit: ", Remit);
    // let [deployer, sender, remitter, ...accounts] = await getSigners();
    // console.log("deployer", deployer);
  };

  return (
    <div>
      <h2>Dapp </h2>
      <Deposit depositRemit={(args) => _deposit(args)} />
    </div>
  );
}

export default Dapp;
