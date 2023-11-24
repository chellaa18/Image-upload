import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { abi } from "./ContractABI";

const ReadContract = () => {

  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState("");
  const [acc, setAcc] = useState("");
  const [toAddressInput, setToAddressInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [toAddressBlackList, settoAddressBlackList] = useState("");


  const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const [contract, setContract] = useState(null);

  const myAcc = "0x0C7419dD3e7a2BCB75f2a3a37310849731b99023";

  const web3Instance = new Web3(window.ethereum);

  const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          const contractInstance = new web3Instance.eth.Contract(
            abi,
            contractAddress
          );
          setContract(contractInstance);

          const accounts = await web3Instance.eth.getAccounts();
          setAcc(accounts[0]);
        } catch (error) {
          console.error("Error initializing Web3:", error.message);
        }
      } else {
        console.error("MetaMask not installed.");
      }
    };

    initializeWeb3();
  }, [contractAddress]);

  const readFromSmartContract = async () => {
    try {
      if (web3 && contract) {
        let tokenName = await contract.methods.name().call();
        console.log("Name: ", tokenName);

        let tokenSymbol = await contract.methods.symbol().call();
        console.log("Symbol: ", tokenSymbol);

        let tokenTotalSupply = await contract.methods.totalSupply().call();
        console.log("Total supply: ", tokenTotalSupply);

        let deprecated = await contract.methods.deprecated().call();
        console.log("Deprecated: ", deprecated);

        let getOwner = await contract.methods.getOwner().call();
        console.log("Owner: ", getOwner);

        const address = "0x69166e49d2fd23e4cbea767d7191be423a7733a5";

        let balanceOfAccount = await contract.methods.balanceOf(address).call();
        let balanceInDeci = web3.utils.fromWei(balanceOfAccount, "ether");

        console.log("BalanceinDeci: ", balanceInDeci);

        let balancess = await contract.methods.balances(address).call();
        let balances = web3.utils.fromWei(balancess, "ether");
        console.log("balances", balances);

        let allowance = await contract.methods
          .allowance(getOwner, "0x0C7419dD3e7a2BCB75f2a3a37310849731b99023")
          .call();
        console.log("allowance", allowance);
      } else {
        console.error("Web3 or contract not initialized.");
      }
    } catch (error) {
      console.error("Error reading from smart contract:", error.message);
    }
  };

  const writeFromSmartContract = async () => {
    try {
      const res = await contractInstance.methods.pause().send({ from: myAcc });
      console.log(res, "success");
    } catch (error) {
      console.error("Error reading from smart contract:", error.message);
    }
  };

  const transferAmt = async (e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(window.ethereum);
      if (web3) {
        const accounts = await web3.eth.getAccounts();

        if (accounts.length > 0) {
          // const toAddress = "0x96Bb411C9F4AC36Cfbf3AaB32bE43EC6408Fd64d";
          const amount = web3.utils.toWei(valueInput, "ether");

          const senderAddress = accounts[0];
          console.log(senderAddress);

          const transfered = await contractInstance.methods
            .transfer(toAddressInput, amount)
            .send({ from: senderAddress });

          console.log(transfered, "transferred");
        }
      }
    } catch (error) {
      console.error("Error transferring funds:", error.message);
    }
  };

  const btnHandler = async () => {
    try {
      if (web3) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAddress(accounts[0]);

        if (accounts.length > 0) {
 
          web3.eth.getBalance(accounts[0]).then((balance) => {
            const balanceInEther = web3.utils.fromWei(balance, "ether");
            console.log(balanceInEther);
          });
        } else {
          console.error("MetaMask not connected. Please connect your wallet.");
        }
      } else {
        console.error("MetaMask not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error.message);
    }
  };

  const blackList = async (e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(window.ethereum);
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
        }
        const res = await contractInstance.methods
          .removeBlackList(toAddressBlackList)
          .send({ from: accounts[0] });
        console.log(res, "Cleared Blacklist");
      }
    } catch (error) {
      console.error("Error transferring funds:", error.message);
    }
  };

  return (
    <>
    {acc ? (
        <div>
          <div className="d-flex justify-content-center mt-4">
            <button onClick={readFromSmartContract} className="btn btn-primary">
              Read Contract
            </button>

            <button
              onClick={writeFromSmartContract}
              className="btn btn-primary ms-3"
            >
              pause
            </button>
          </div>
          <div className="container mt-4">
            <div className="row justify-content-center">
              <div className="col-6 border p-5">
                <div className="mt-3">
                  <form onSubmit={transferAmt}>
                    <h4>Transfer Amount</h4>
                    <div className="mb-3">
                      <label htmlFor="toAddressInput" className="form-label">
                        To Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="toAddressInput"
                        value={toAddressInput}
                        onChange={(e) => setToAddressInput(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="valueInput" className="form-label">
                        Value (in Ether)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="valueInput"
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Transfer Amount
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="row my-5 justify-content-center">
              <div className="col-6 border p-5">
                <div className="mt-3">
                  <form onSubmit={blackList}>
                    <h4>Remove Blacklist</h4>
                    <div className="mb-3">
                      <label
                        htmlFor="toAddressBlackList"
                        className="form-label"
                      >
                        To Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="toAddressBlackList"
                        value={toAddressBlackList}
                        onChange={(e) => settoAddressBlackList(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      remove Blacklist
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <button onClick={btnHandler} className="ms-3 btn btn-primary">
            Connect to wallet
          </button>
        </div>
      )} 
    </>
  );
};

export default ReadContract;
