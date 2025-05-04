
import React, { createContext, useContext } from 'react';
import { StakingContextType } from './types';
import { useWallet } from '@/hooks/useWallet';
import { useReferrals } from '@/hooks/useReferrals';
import { useStakingLogic } from '@/hooks/useStakingLogic';

// Default values for the context
const defaultValues: StakingContextType = {
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
};

const StakingContext = createContext<StakingContextType>(defaultValues);

export const useStaking = () => useContext(StakingContext);

export const StakingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    walletConnected, 
    walletAddress, 
    isLoading, 
    balance, 
    setBalance, 
    connectWallet, 
    disconnectWallet: disconnectWalletFn,
    setIsLoading 
  } = useWallet();
  
  const { 
    referralCode, 
    referrals, 
    referralBonus, 
    copyReferralLink 
  } = useReferrals();
  
  const { 
    stakedAmount, 
    rewards, 
    isStaking, 
    stakingEndTime, 
    timeRemaining, 
    stakeTokens, 
    unstakeTokens, 
    claimRewards 
  } = useStakingLogic({ 
    balance, 
    setBalance, 
    walletConnected, 
    setIsLoading 
  });

  // Wrapper for disconnectWallet to pass isStaking
  const disconnectWallet = () => disconnectWalletFn(isStaking);

  const value: StakingContextType = {
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
