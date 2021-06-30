import { Input } from "antd";
import React, { useEffect, useState } from "react";

/*
 ~ What it does? ~
 
 Displays input field for ETh
 
 ~ How can I use? ~

 <EtherInput
    autoFocus
    value=142
    placeholder="Enter amount"
    onChange={ value => {
        setAmount(value)
    }}
 />

 ~ Features ~

 - Provide value={value} to specify initial amount of ether
 - Provide placeholder="Enter amount" place holder text for the input
 - Control input change by onChange={value => { setAmount(value);}}

 */

export default function EtherInput(props) {
  const [value, setValue] = useState();
  const [display, setDisplay] = useState();

  const currentValue = typeof props.value !== "undefined" ? props.value : value;

  let prefix;
  prefix = "Ξ";

  useEffect(() => {
    if (!currentValue) {
      setDisplay("");
    }
  }, [currentValue]);

  return (
    <Input
      placeholder={props.placeholder ? props.placeholder : "amount in ETH"}
      autoFocus={props.autoFoucs}
      prefix={prefix}
      value={display}
      onChange={async (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        setDisplay(newValue);
      }}
    />
  );
}
