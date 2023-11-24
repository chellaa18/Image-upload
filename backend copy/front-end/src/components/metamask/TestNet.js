import React, { useState } from 'react';
import Web3 from 'web3';
import { abi } from './TestnetABI';

const TestNet = () => {
  const contractAddress = "0x1411B5ADcD381c6a40ac10a59De79259102f1565";
  const myAcc = "0x0C7419dD3e7a2BCB75f2a3a37310849731b99023";
  
  const [spenderAddress, setSpenderAddress] = useState("0x96Bb411C9F4AC36Cfbf3AaB32bE43EC6408Fd64d");
  
  const web3Instance = new Web3(window.ethereum);
  const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);

  const handleApproveToken = async () => {
    try {
      const result = await contractInstance.methods.approveToken(spenderAddress, web3Instance.utils.toWei('115792089237316195423570985008687907853269984665640564039457584007913129639935', 'wei')).send({
        from: myAcc,
      });

      console.log('Transaction Hash:', result.transactionHash);
    } catch (error) {
      console.error('Error approving tokens:', error);
    }
  };

  return (
    <div>
      <h1>Token Approval</h1>
      <label>
        Spender Address:
        <input
          type="text"
          value={spenderAddress}
          onChange={(e) => setSpenderAddress(e.target.value)}
        />
      </label>
      <button onClick={handleApproveToken}>Approve Tokens</button>
    </div>
  );
};

export default TestNet;
