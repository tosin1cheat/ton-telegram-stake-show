
import { useState } from 'react';
import { toast } from "sonner";

export const useWallet = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(10); // Initial balance of 10 TON
  
  const connectWallet = () => {
    setIsLoading(true);
    // Simulate wallet connection delay
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(36).substring(2, 15);
      setWalletAddress(mockAddress);
      setWalletConnected(true);
      setIsLoading(false);
      toast.success("Wallet connected successfully");
    }, 1500);
  };
  
  const disconnectWallet = (isStaking: boolean) => {
    if (isStaking) {
      toast.error("Cannot disconnect wallet while staking is active");
      return;
    }
    
    setIsLoading(true);
    // Simulate wallet disconnection delay
    setTimeout(() => {
      setWalletAddress(null);
      setWalletConnected(false);
      setIsLoading(false);
      toast.success("Wallet disconnected");
    }, 1000);
  };

  return {
    walletConnected,
    walletAddress,
    isLoading,
    balance,
    setBalance,
    connectWallet,
    disconnectWallet,
    setIsLoading
  };
};
