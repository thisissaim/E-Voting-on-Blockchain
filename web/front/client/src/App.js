import React, { useEffect, useState } from 'react';

import './App.css';
import Body from './Body';
import Electionabi from './contracts/Election.json'
import Login from './Login';
import Web3 from "web3";
import Navbar from "./Navbar";
import Signups from "./Signups";
import WebcamCapture from './components/webcam';



function App() {

  useEffect(() =>{
    loadWeb3();
    loadBlockchainData();
    console.log("first")

  } , [])
  const[currentAccount , setCurrentAccount] = useState("");
  const[loader,setloader] = useState(true);
  const[Electionsm,SetElectionsm] = useState();
  const[Candidate1 , setCandidate1] = useState();
  const[Candidate2 , setCandidate2] = useState();
  const [active , setActive] = useState("App");
 
  console.log("second");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("firssst");

    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("third");
    }
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    console.log("he")
    setloader(true);
   

    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentAccount(account);
    console.log("he")

    const networkId = await web3.eth.net.getId();

    const networkData = Electionabi.networks[networkId];
    console.log("h1e")

    if (networkData) {
      console.log("h1e")
      const election = new web3.eth.Contract(Electionabi.abi, networkData.address);
      console.log("h1e")
      const candidate1 = await election.methods.candidates(1).call();
      const candidate1id = candidate1.id;
      console.log("h1e")
      // const candidate1name = candidate1.name;
      // const candidate1votecount = candidate1.voteCount;
      const candidate2 = await election.methods.candidates(2).call();
      // const candidate2id = candidate2.id;
      // const candidate2name = candidate2.name;
      // const candidate2votecount = candidate2.voteCount;
     setCandidate1(candidate1);
     setCandidate2(candidate2);

      console.log(candidate1);
      console.log(candidate2);
      console.log(candidate1id);
      console.log(Candidate1);

      SetElectionsm(election);
      

      setloader(false);//stop loading if network connects 
    }
    else{
      window.alert("Not deployed on current network");
    }
  };

  const votecandidate = async (candidateid) =>{
    setloader(true);
    await Electionsm
    .methods
    .vote(candidateid)
    .send({from : currentAccount})
    .on("TransactionHash" , ()=>{
      console.log("Successfully Ran!");
    })
    setloader(false);
  }

  if(loader){
    return <div>Loading...</div>
  }


 




  return (
    <div>
   <Navbar account = {currentAccount}/>
   <nav className='navf'>
    <button onClick={()=> setActive("ContactUs")}>Log-In</button>
    <button onClick={()=> setActive("Body")}>Go to Voting</button>
    <button onClick={()=> setActive("Signup")}>Signup</button>
    <button onClick={()=> setActive("WebcamCapture")}>Record Face-ID</button>
    
   </nav>
   <div>
    {active === "Signup" && <Signups title="Signup"/>}
    {active === "ContactUs" && <Login title="Log-In"/>}
    {active === "Body" && <Body 
    candidate1 = {Candidate1}
    candidate2 = {Candidate2}
     votecandidate={votecandidate}
     account = {currentAccount}
      title="Go To Voting"/>}
      {active === "WebcamCapture" && <WebcamCapture title="Face Capture"/>}
    
   </div>
 
    </div>
  );
};

export default App;