import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { toast } from "react-toastify";

const GetAccount = () => {
  const [address, setAddress] = useState("");
  const [block, setBlock] = useState('');
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3("https://endpoints.omniatech.io/v1/bsc/testnet/public");
      setWeb3(web3);
    }
  }, []);

  const btnHandler = async () => {
    if (web3) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      setAddress(accounts);

      if (accounts.length > 0) {
        web3.eth.getBalance(accounts[0]).then((balance) => {
       
  
          const balanceInEther = web3.utils.fromWei(balance, "ether");
          setBalance(balanceInEther);
        
        });
      }else {
        console.error("MetaMask not connected. Please connect your wallet.");
      }
    } else {
      console.error("MetaMask not installed.");
    }
  };
  // console.log("Balance in Ether:", balance); 

  const networkHandler = async () => {
    try{
      await window.ethereum.request({
        "method": "wallet_switchEthereumChain",
        "params": [
          {
            "chainId": "0x38"
          }
        ]
      })
    }
    catch(err){
     toast.error(err.message);
    }
  
  }


const blockHandler = async () =>{
   await web3.eth.getBlockNumber().then( (res)=>setBlock(res));
}

console.log(block);

  return (
    <div className="App mt-5 vh-100">
      <div className="text-center">
        <h4 className="form-label">
          <strong>Address: </strong>
          {address}
        </h4>
        <h4 className="form-label">
          <strong>Balance: </strong>
          {balance}
        </h4>
        <button onClick={btnHandler} className="btn btn-primary">
          Connect to wallet
        </button>
        <br />
        <br />
        <button onClick={networkHandler} className="btn btn-primary">
          switch to network
        </button>
        <br />
        <br />
        <button onClick={blockHandler} className="btn btn-primary">
          get block No
        </button>
        <strong className="ms-4">Block Number: </strong>
          {parseInt(block)}
          <br/>
          <br/>
        
      </div>
    </div>
  );
};

export default GetAccount;