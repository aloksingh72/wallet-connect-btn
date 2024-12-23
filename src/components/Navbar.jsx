import newlogo from "../images/new-logo.png";

import Web3Modal from "web3modal";
import { BrowserProvider } from "ethers"; // Correct import for ethers v6
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Fortmatic from "fortmatic"; 
import { useState } from "react";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      infuraId: "https://ropsten.infura.io/v3/fefnesfe", // Corrected infuraId format
    },
  },
 
  
};
//navbar function 
const Navbar = () => {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [walletAddress,setWalletAddress] = useState("");

  async function connectWallet() {
    try {
      const web3modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });

      const web3ModalInstance = await web3modal.connect();
      const web3ModalProvider = new BrowserProvider(web3ModalInstance);

      console.log("Connected Wallet Provider:", web3ModalProvider);

      if (web3ModalProvider) {
        setWeb3Provider(web3ModalProvider);
        const signer = await web3ModalProvider.getSigner();
        const address = await signer.getAddress();
        console.log("wallet Address",address);

        setWalletAddress(address);//save the wallet address to the state
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

 // Function to format wallet address (e.g., 0x1234...abcd)
 const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="flex bg-black h-screen flex-col">
      {/* Navbar */}
      <div className="bg-black text-white px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <img src={newlogo} alt="Logo" className="w-10 h-10" />
        </div>

        {/* Connect Wallet Button */}
        {web3Provider == null ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center">
             {/* Show Wallet Address */}
             <span className="mr-4  bg-blue-500 text-white py-2 px-4 rounded-lg">
             {formatAddress(walletAddress)}
             </span>
             <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => {
                  setWeb3Provider(null);
                  setWalletAddress("");
                }}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {/* Search Container and Create New AI Agent Button Section */}
      <div className="bg-slate-900 h-fit mt-4 ml-10 mr-10 px-8 py-8 flex justify-between items-center">
        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search Agent"
            className="w-full p-3 text-white border border-gray-400 rounded bg-slate-700"
          />
        </div>

        {/* Create New AI Agent Button */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded ml-2">
          Create New AI Agent
        </button>
      </div>
    </div>
  );
};

export default Navbar;
