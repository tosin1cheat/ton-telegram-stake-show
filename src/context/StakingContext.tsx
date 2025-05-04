
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

interface StakingContextType {
  balance: number;
  stakedAmount: number;
  rewards: number;
  isStaking: boolean;
  stakingEndTime: number | null;
  referralCode: string;
  referrals: number;
  referralBonus: number;
  stakeTokens: () => void;
  unstakeTokens: () => void;
  claimRewards: () => void;
  copyReferralLink: () => void;
  timeRemaining: string;
  walletConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const StakingContext = createContext<StakingContextType>({
  balance: 10,
  stakedAmount: 0,
  rewards: 0,
  isStaking: false,
  stakingEndTime: null,
  referralCode: '',
  referrals: 0,
  referralBonus: 0,
  stakeTokens: () => {},
  unstakeTokens: () => {},
  claimRewards: () => {},
  copyReferralLink: () => {},
  timeRemaining: '',
  walletConnected: false,
  walletAddress: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
  isLoading: false,
});

export const useStaking = () => useContext(StakingContext);

export const StakingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(10); // Initial balance of 10 TON
  const [stakedAmount, setStakedAmount] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  const [stakingEndTime, setStakingEndTime] = useState<number | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState(0);
  const [referralBonus, setReferralBonus] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a unique referral code on initial load
  useEffect(() => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setReferralCode(randomCode);
    
    // Simulate some random referrals for demo purposes
    const randomReferrals = Math.floor(Math.random() * 5);
    setReferrals(randomReferrals);
    setReferralBonus(randomReferrals * 0.1); // 0.1 TON bonus per referral
  }, []);

  // Update rewards in real-time during staking period
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isStaking && stakingEndTime) {
      intervalId = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - (stakingEndTime - 4 * 60 * 60 * 1000); // 4 hours in ms
        const totalDuration = 4 * 60 * 60 * 1000; // 4 hours in ms
        
        // Calculate progress (0 to 1)
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Calculate rewards based on progress (from 0 to 2 TON)
        const calculatedRewards = 2 * progress;
        setRewards(parseFloat(calculatedRewards.toFixed(4)));
        
        // Calculate time remaining
        if (stakingEndTime > now) {
          const remaining = stakingEndTime - now;
          const hours = Math.floor(remaining / (60 * 60 * 1000));
          const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
          const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
          setTimeRemaining(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeRemaining('00:00:00');
          setIsLoading(false); // Ensure loading is turned off when time is up
        }
        
        // End staking when time is up
        if (now >= stakingEndTime) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isStaking, stakingEndTime]);

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
  
  const disconnectWallet = () => {
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

  const stakeTokens = () => {
    if (!walletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (balance < 2.5) { // 2 TON + 0.5 TON fee
      toast.error("Insufficient balance to stake (2 TON + 0.5 TON fee)");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      setBalance((prevBalance) => prevBalance - 2.5); // 2 TON stake + 0.5 TON fee
      setStakedAmount(2);
      setIsStaking(true);
      
      // Set staking end time to 4 minutes from now for demo
      const endTime = Date.now() + 4 * 60 * 1000; // 4 minutes in ms
      setStakingEndTime(endTime);
      
      setIsLoading(false);
      toast.success("Successfully staked 2 TON (0.5 TON fee applied)");
    }, 2000);
  };

  const unstakeTokens = () => {
    if (!isStaking || !stakingEndTime) {
      toast.error("Nothing to unstake");
      return;
    }
    
    if (Date.now() < stakingEndTime) {
      toast.error("Cannot unstake before staking period is complete");
      return;
    }
    
    if (balance < 0.5) {
      toast.error("Insufficient balance for withdrawal fee (0.5 TON)");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      // Apply withdrawal fee from wallet balance
      setBalance((prevBalance) => prevBalance - 0.5 + stakedAmount + rewards);
      setStakedAmount(0);
      setRewards(0);
      setIsStaking(false);
      setStakingEndTime(null);
      
      setIsLoading(false);
      toast.success(`Successfully unstaked ${stakedAmount} TON and ${rewards.toFixed(4)} TON rewards (0.5 TON fee applied)`);
    }, 2000);
  };

  const claimRewards = () => {
    if (!isStaking || !stakingEndTime) {
      toast.error("No active staking to claim rewards from");
      return;
    }
    
    if (Date.now() < stakingEndTime) {
      toast.error("Cannot claim rewards before staking period is complete");
      return;
    }
    
    if (rewards <= 0) {
      toast.error("No rewards to claim");
      return;
    }
    
    if (balance < 0.5) {
      toast.error("Insufficient balance for claim fee (0.5 TON)");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate transaction delay
    setTimeout(() => {
      // Fee is taken from wallet, rewards are added directly
      setBalance((prevBalance) => prevBalance - 0.5 + rewards);
      const claimedRewards = rewards;
      setRewards(0);
      
      setIsLoading(false);
      toast.success(`Successfully claimed ${claimedRewards.toFixed(4)} TON rewards (0.5 TON fee applied)`);
    }, 2000);
  };

  const copyReferralLink = () => {
    const referralLink = `https://ton-staking.demo/${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard");
  };

  const value = {
    balance,
    stakedAmount,
    rewards,
    isStaking,
    stakingEndTime,
    referralCode,
    referrals,
    referralBonus,
    stakeTokens,
    unstakeTokens,
    claimRewards,
    copyReferralLink,
    timeRemaining,
    walletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    isLoading,
  };

  return (
    <StakingContext.Provider value={value}>
      {children}
    </StakingContext.Provider>
  );
};
