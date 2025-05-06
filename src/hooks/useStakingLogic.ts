
import { useState, useEffect } from 'react';
import { toast } from "sonner";

interface UseStakingLogicProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  walletConnected: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useStakingLogic = ({ 
  balance, 
  setBalance, 
  walletConnected, 
  setIsLoading 
}: UseStakingLogicProps) => {
  const [stakedAmount, setStakedAmount] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [isStaking, setIsStaking] = useState(false);
  const [stakingEndTime, setStakingEndTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  // Update rewards in real-time during staking period
  useEffect(() => {
    let intervalId: number | undefined;
    
    if (isStaking && stakingEndTime) {
      intervalId = window.setInterval(() => {
        const now = Date.now();
        const elapsed = now - (stakingEndTime - 60 * 1000); // 60 seconds in ms (representing 6 hours)
        const totalDuration = 60 * 1000; // 60 seconds in ms
        
        // Calculate progress (0 to 1)
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Calculate rewards based on progress (from 0 to 2 TON - 2x return)
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
  }, [isStaking, stakingEndTime, setIsLoading]);
  
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
      
      // Set staking end time to 60 seconds from now for demo
      const endTime = Date.now() + 60 * 1000; // 60 seconds in ms
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
      // Apply withdrawal fee from wallet balance and return both principal and rewards
      setBalance((prevBalance) => prevBalance - 0.5 + stakedAmount + rewards);
      setStakedAmount(0);
      setRewards(0);
      setIsStaking(false);
      setStakingEndTime(null);
      
      setIsLoading(false);
      toast.success(`Successfully unstaked ${stakedAmount} TON and ${rewards.toFixed(4)} TON rewards (0.5 TON fee applied)`);
    }, 2000);
  };

  // Remove the separate claimRewards function since we're consolidating functionality into unstakeTokens
  
  return {
    stakedAmount,
    rewards,
    isStaking,
    stakingEndTime,
    timeRemaining,
    stakeTokens,
    unstakeTokens,
  };
};
