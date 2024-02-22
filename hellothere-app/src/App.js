import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import HelloWorldArtifact from './contracts/HelloWorld.json';
const contractABI = HelloWorldArtifact.abi;
const contractAddress = '0x3cd9F15209eAfE6846a6524289da0c0FbE0D7727'; 

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [greetingCount, setGreetingCount] = useState(0);
  const [name, setName] = useState('');
  const [personalizedMessage, setPersonalizedMessage] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error('Error fetching accounts: ', error);
        }
      } else {
        console.error('Web3 not found. Please use a Web3-enabled browser like MetaMask.');
      }
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const loadContractData = async () => {
      if (web3 && account) {
        const helloWorldContract = new web3.eth.Contract(contractABI, contractAddress);
        const count = await helloWorldContract.methods.getGreetingCount().call();
        setGreetingCount(count);
      }
    };

    loadContractData();
  }, [web3, account, contractABI, contractAddress]);

  const handleSayHelloToPerson = async () => {
    if (!web3 || !account) {
      console.error('Web3 or account not initialized');
      return;
    }

    try {
      const helloWorldContract = new web3.eth.Contract(contractABI, contractAddress);
      const transaction = await helloWorldContract.methods.sayHelloTo(name).send({ from: account });
      const transactionId = transaction.transactionHash;
      const transactionData = {
        greeting: name,
        contractId: contractAddress,
        transactionId: transactionId
      };
      setTransactionHistory(prevHistory => [...prevHistory, transactionData]);
      setPersonalizedMessage(`Hello, ${name}! Transaction ID: ${transactionId}`);
  
    } catch (error) {
      console.error('Error saying hello to person: ', error);
    }
  };

  const toggleTransactionHistory = () => {
    setShowTransactionHistory(!showTransactionHistory);
  };

  return (
    <div className="App">
      <div className="stars"></div>
      <h1>Hello World Contract</h1>
      <p>Your account: {account}</p>
      <p>Total greetings: {transactionHistory.length}</p> {/* Display length of transactionHistory array */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={handleSayHelloToPerson}>Say Hello</button>
      </div>
      {personalizedMessage && <p>{personalizedMessage}</p>}

      <button style={{ marginTop: '50px' }}  onClick={toggleTransactionHistory}>Toggle Transaction History</button>

      {showTransactionHistory && (
        <div>
          <ul>
            {transactionHistory.map((transaction, index) => (
              <li key={index}>
                <p>Greeting: {transaction.greeting}</p>
                <p>Contract ID: {transaction.contractId}</p>
                <p>Transaction ID: {transaction.transactionId}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
