import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import EtherInput from "./EtherInput";

const emptyDeposit = {
  sender: "",
  remitter: "",
  password: "",
  lockDuration: 0,
  amount: 0,
};

function handleChange(evt) {
  // [evt.target.name] : evt.target.value
}

function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("Deposit submit event");
  //   const formData = new FormData(event.target);
  //   const depositor = formData.get("depositSender");
  //   const remitter = formData.get("depositRemitter");
  //   const password = formData.get("depositPassword");
  //   const lockDuration = formData.get("depositLockDuration");
  //   const amount = formData.get("depositAmount");
  //   //validation
  //   depositRemit(depositor, remitter, password, lockDuration, amount);
}

export function Deposit({ depositRemit }) {
  const [deposit, setDeposit] = useState(emptyDeposit);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section id="depositForm" style={{ width: "50%" }}>
          <div class="sectionHeader mb-4 box-shadow ">
            <h4 class="font-weight-normal">Deposit</h4>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="depositSender"
              aria-describedby="senderHelp"
              aria-placeholder="Sender"
              placeholder="Depositor"
              required
            />
            <small id="depositSenderHelp" class="form-text text-info"></small>
            <small
              id="depositSenderError"
              class="form-text text-danger"
            ></small>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="depositRemitter"
              aria-describedby="receiver1Help"
              aria-placeholder="Remitter"
              placeholder="Remitter"
            />
            <small id="depositRemitterHelp" class="form-text text-info"></small>
            <small
              id="depositRemitterError"
              class="form-text text-danger"
            ></small>
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              id="depositPassword"
              aria-describedby="receiver2Help"
              aria-placeholder="Second receiver"
              placeholder="Password"
            />
            <small id="depositPasswordHelp" class="form-text text-info"></small>
            <small
              id="depositPasswordError"
              class="form-text text-danger"
            ></small>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="depositLockDuration"
              aria-describedby="depositLockDurationHelp"
              aria-placeholder="86400"
              placeholder="Deposit Lock Duration in seconds"
            />
            <small
              id="depositLockDurationHelp"
              class="form-text text-info"
            ></small>
            <small
              id="depositLockDurationError"
              class="form-text text-danger"
            ></small>
          </div>
          <div className="form-group">
            {/* <input
              type="text"
              class="form-control"
              id="depositAmount"
              aria-describedby="amountHelp"
              aria-placeholder="42.10"
              placeholder="Amount"
            /> */}
            <EtherInput
              autoFocus
              value={0}
              placeholder="Enter amount"
              onChange={(value) => {
                setDeposit(value);
              }}
            />
            <small id="depositAmountHelp" class="form-text text-info"></small>
            <small
              id="depositAmountError"
              class="form-text text-danger"
            ></small>
          </div>
          <br />
          <div
            class="form-group"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <button
              class="btn btn-lg btn-block btn-success"
              id="btnDeposit"
              onClick={() => {
                console.log("Deposit button clicked");
              }}
              //   "App.deposit()"
            >
              <i class="fas fa-coins"></i> Deposit{" "}
            </button>
          </div>

          {/*  TODO : add duration info, revert error panel  */}
        </section>
      </form>
    </div>
  );
}
