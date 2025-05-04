
import React from 'react';
import Navigation from '@/components/Navigation';
import { useStaking } from '@/context/StakingContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link as RouterLink } from 'react-router-dom';
import { Loader, Link, Unlink } from 'lucide-react';

const Rewards = () => {
  const { 
    balance,
    stakedAmount, 
    rewards, 
    isStaking, 
    claimRewards, 
    referrals,
    referralBonus,
    timeRemaining,
    walletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    isLoading
  } = useStaking();

  const totalRewards = rewards + referralBonus;
  const progressPercentage = (rewards / 2) * 100;
  const canClaimRewards = isStaking && Date.now() >= (useStaking().stakingEndTime || 0);

  return (
    <div className="min-h-screen bg-sidebar text-sidebar-foreground pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-center">Your Rewards</h1>
          <p className="text-center text-muted-foreground">
            Track and claim your staking rewards
          </p>
        </div>

        {/* Wallet Connection Card */}
        <div className="mb-6 bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Wallet Connection</h2>
          <div className="flex items-center justify-between">
            <div>
              {walletConnected ? (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Connected Wallet</span>
                  <span className="font-mono text-xs truncate max-w-[180px]">{walletAddress}</span>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">Not connected</div>
              )}
            </div>
            
            {isLoading ? (
              <Button disabled className="animate-pulse">
                <Loader className="animate-spin mr-2" size={16} />
                Processing...
              </Button>
            ) : walletConnected ? (
              <Button 
                variant="outline" 
                onClick={disconnectWallet}
                disabled={isStaking}
                className="border-destructive text-destructive hover:bg-destructive/10"
              >
                <Unlink size={16} className="mr-2" />
                Disconnect
              </Button>
            ) : (
              <Button onClick={connectWallet} className="bg-primary text-primary-foreground">
                <Link size={16} className="mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        {/* Total Rewards Card */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl mb-6 text-center animate-fade-in">
          <h2 className="text-lg mb-2">Total Rewards</h2>
          <div className="text-3xl font-bold text-primary mb-1 animate-pulse">
            {totalRewards.toFixed(4)} TON
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            From Staking & Referrals
          </p>
          <Button 
            className="bg-primary text-primary-foreground"
            onClick={claimRewards}
            disabled={totalRewards <= 0 || !canClaimRewards || isLoading || balance < 0.5}
          >
            {isLoading ? <Loader className="animate-spin mr-2" size={16} /> : null}
            Claim All Rewards
          </Button>
          {isStaking && !canClaimRewards && (
            <p className="text-destructive text-xs mt-2">
              Rewards can only be claimed after staking period ends
            </p>
          )}
          {canClaimRewards && balance < 0.5 && (
            <p className="text-destructive text-xs mt-2">
              Insufficient balance for 0.5 TON claim fee
            </p>
          )}
        </div>

        {/* Staking Rewards */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl mb-6 animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Staking Rewards</h2>
          
          {isStaking ? (
            <div className="bg-accent/20 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-muted-foreground">Staked Amount</p>
                <p className="font-semibold">{stakedAmount} TON</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-muted-foreground">Current Rewards</p>
                <p className="font-semibold text-primary">{rewards.toFixed(4)} TON</p>
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-muted-foreground">Expected Return</p>
                <p className="font-semibold">+2 TON (100%)</p>
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-muted-foreground">Withdrawal Fee</p>
                <p className="text-destructive font-semibold">0.5 TON <span className="text-xs">(from wallet)</span></p>
              </div>
              
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>0 TON</span>
                <span className="font-medium text-primary">{timeRemaining}</span>
                <span>2 TON</span>
              </div>
            </div>
          ) : (
            <div className="bg-muted rounded-xl p-6 text-center">
              <p className="text-muted-foreground mb-4">You're not staking any TON right now</p>
              <RouterLink to="/stake">
                <Button className="bg-primary text-primary-foreground">
                  Start Staking
                </Button>
              </RouterLink>
            </div>
          )}
        </div>

        {/* Referral Rewards */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl mb-6 animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Referral Rewards</h2>
          <div className="bg-muted rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-muted-foreground">Total Referrals</p>
              <p className="font-semibold">{referrals}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-muted-foreground">Referral Bonus</p>
              <p className="font-semibold text-primary">{referralBonus.toFixed(2)} TON</p>
            </div>
            <RouterLink to="/referrals">
              <Button className="bg-primary text-primary-foreground w-full">
                Invite More Friends
              </Button>
            </RouterLink>
          </div>
        </div>

        {/* Reward History */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Reward History</h2>
          {totalRewards > 0 ? (
            <div className="space-y-3">
              {rewards > 0 && (
                <div className="flex justify-between items-center p-3 border-b border-border">
                  <div>
                    <p className="font-medium">Staking Rewards</p>
                    <p className="text-xs text-muted-foreground">Current staking period</p>
                  </div>
                  <p className="font-semibold text-primary">+{rewards.toFixed(4)} TON</p>
                </div>
              )}
              {referralBonus > 0 && (
                <div className="flex justify-between items-center p-3">
                  <div>
                    <p className="font-medium">Referral Bonus</p>
                    <p className="text-xs text-muted-foreground">From {referrals} referrals</p>
                  </div>
                  <p className="font-semibold text-primary">+{referralBonus.toFixed(2)} TON</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No reward history yet</p>
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;
