import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import EtherInput from "./EtherInput";

const emptyDeposit = {
  senderError: "",
  remitterError: "",
  passwordError: "",
  lockDurationError: "",
  amountError: "",
  sender: "",
  remitter: "",
  password: "",
  lockDuration: 0,
  amount: 0,
};

export function Deposit({ depositRemit }) {
  const [deposit, setDeposit] = useState(emptyDeposit);

  function handleChange(e) {
    setDeposit((currDeposit) => {
      return {
        ...currDeposit,
        [e.target.id]: e.target.value,
        [`${e.target.id}Error`]: "",
      };
    });
  }

  function handleSubmitValidation(e) {
    if (deposit.sender === "") {
      deposit.senderError = "Sender address can not be empty";
    } else if (deposit.sender.length < 5) {
      deposit.senderError = "Sender address is too short";
    }
    //-----------------
    if (deposit.remitter === "") {
      deposit.remitterError = "Remitter address can not be empty";
    } else if (deposit.remitter.length < 5) {
      deposit.remitterError = "Remitter address is too short";
    }
    //-----------------
    if (deposit.password === "") {
      deposit.passwordError = "Password can not be empty";
    } else if (deposit.password.length < 6) {
      deposit.passwordError = "Password must be at least 6 characters";
    }
    //-----------------
    if (deposit.lockDuration > 3153600000) {
      deposit.lockDurationError =
        "Lock duration can not be longer than 100 years";
    }
    //-----------------
    if (deposit.amount < 1) {
      deposit.amountError = "Minimum deposit amount of 2 wei required";
    }
  }

  function handleSubmitErrors(e) {
    setDeposit((currDeposit) => {
      return {
        ...currDeposit,
        [`${e.target.id}Error`]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitValidation(e);
    handleSubmitErrors(e);
  }

  function handleDepositClick() {
    console.log("Deposit button clicked");
    const {
      senderError,
      remitterError,
      passwordError,
      lockDurationError,
      amountError,
      ...data
    } = deposit;
    depositRemit({
      data,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section id="depositForm" style={{ width: "50%" }}>
          <div className="sectionHeader mb-4 box-shadow ">
            <h4 className="font-weight-normal">Deposit</h4>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="sender"
              value={deposit.sender}
              onChange={handleChange}
              aria-describedby="senderHelp"
              aria-placeholder="Sender"
              placeholder="Depositor"
            />
            {deposit.senderError && (
              <small id="senderError" className="form-text text-danger">
                {deposit.senderError}
              </small>
            )}
            <small
              id="depositSenderHelp"
              className="form-text text-info"
            ></small>
            <small
              id="depositSenderError"
              className="form-text text-danger"
            ></small>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="remitter"
              value={deposit.remitter}
              onChange={handleChange}
              aria-describedby="receiver1Help"
              aria-placeholder="Remitter"
              placeholder="Remitter"
            />
            {deposit.remitterError && (
              <small id="remitterError" className="form-text text-danger">
                {deposit.remitterError}
              </small>
            )}
            <small
              id="depositRemitterHelp"
              className="form-text text-info"
            ></small>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              value={deposit.password}
              onChange={handleChange}
              aria-describedby="receiver2Help"
              aria-placeholder="Second receiver"
              placeholder="Password"
            />
            {deposit.passwordError && (
              <small id="passwordError" className="form-text text-danger">
                {deposit.passwordError}
              </small>
            )}
            <small
              id="depositPasswordHelp"
              className="form-text text-info"
            ></small>
          </div>
          <div className="form-group">
            <input
              type="number"
              min={0}
              max={3153600000}
              className="form-control"
              id="lockDuration"
              value={deposit.lockDuration}
              onChange={handleChange}
              aria-describedby="depositLockDurationHelp"
              aria-placeholder="86400"
              placeholder="Deposit Lock Duration in seconds"
            />
            {deposit.lockDurationError && (
              <small id="lockDurationError" className="form-text text-danger">
                {deposit.lockDurationError}
              </small>
            )}
            <small
              id="depositLockDurationHelp"
              className="form-text text-info"
            ></small>
          </div>
          <div className="form-group">
            <input
              type="number"
              min={2}
              className="form-control"
              id="amount"
              value={deposit.amount}
              onChange={handleChange}
              aria-describedby="amountHelp"
              aria-placeholder="42.10"
              placeholder="Amount"
            />
            {deposit.amountError && (
              <small id="amountError" className="form-text text-danger">
                {deposit.amountError}
              </small>
            )}
            {/* <EtherInput
              autoFocus
              id="amount"
              value={deposit.amount}
              placeholder="Enter amount"
              onChange={(value) => handleChange(value)}
            /> */}
            <small
              id="depositAmountHelp"
              className="form-text text-info"
            ></small>
          </div>
          <br />
          <div
            className="form-group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              className="btn btn-lg btn-block btn-success"
              id="btnDeposit"
              onClick={() => {
                handleDepositClick();
              }}
            >
              <i className="fas fa-coins"></i> Deposit{" "}
            </button>
          </div>

          {/*  TODO : add duration info  */}
        </section>
      </form>
    </div>
  );
}
