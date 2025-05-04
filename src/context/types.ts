
export interface StakingContextType {
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
