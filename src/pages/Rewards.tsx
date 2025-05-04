
import React from 'react';
import Navigation from '@/components/Navigation';
import { useStaking } from '@/context/StakingContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

const Rewards = () => {
  const { 
    stakedAmount, 
    rewards, 
    isStaking, 
    claimRewards, 
    referrals,
    referralBonus,
    timeRemaining
  } = useStaking();

  const totalRewards = rewards + referralBonus;
  const progressPercentage = (rewards / 2) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-center">Your Rewards</h1>
          <p className="text-center text-gray-600">
            Track and claim your staking rewards
          </p>
        </div>

        {/* Total Rewards Card */}
        <div className="ton-card mb-6 text-center">
          <h2 className="text-lg mb-2">Total Rewards</h2>
          <div className="text-3xl font-bold text-ton-primary mb-1">
            {totalRewards.toFixed(4)} TON
          </div>
          <p className="text-gray-500 text-sm mb-4">
            From Staking & Referrals
          </p>
          <Button 
            className="ton-button"
            onClick={claimRewards}
            disabled={totalRewards <= 0}
          >
            Claim All Rewards
          </Button>
        </div>

        {/* Staking Rewards */}
        <div className="ton-card mb-6">
          <h2 className="text-lg font-bold mb-4">Staking Rewards</h2>
          
          {isStaking ? (
            <div className="bg-ton-light rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Staked Amount</p>
                <p className="font-semibold">{stakedAmount} TON</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Current Rewards</p>
                <p className="font-semibold text-ton-primary">{rewards.toFixed(4)} TON</p>
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600">Expected Return</p>
                <p className="font-semibold">+2 TON (100%)</p>
              </div>
              
              <Progress value={progressPercentage} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>0 TON</span>
                <span className="font-medium text-ton-primary">{timeRemaining}</span>
                <span>2 TON</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-gray-600 mb-4">You're not staking any TON right now</p>
              <Link to="/stake">
                <Button className="ton-button">
                  Start Staking
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Referral Rewards */}
        <div className="ton-card mb-6">
          <h2 className="text-lg font-bold mb-4">Referral Rewards</h2>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-600">Total Referrals</p>
              <p className="font-semibold">{referrals}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">Referral Bonus</p>
              <p className="font-semibold text-ton-primary">{referralBonus.toFixed(2)} TON</p>
            </div>
            <Link to="/referrals">
              <Button className="ton-button w-full">
                Invite More Friends
              </Button>
            </Link>
          </div>
        </div>

        {/* Reward History */}
        <div className="ton-card">
          <h2 className="text-lg font-bold mb-4">Reward History</h2>
          {totalRewards > 0 ? (
            <div className="space-y-3">
              {rewards > 0 && (
                <div className="flex justify-between items-center p-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">Staking Rewards</p>
                    <p className="text-xs text-gray-500">Current staking period</p>
                  </div>
                  <p className="font-semibold text-ton-primary">+{rewards.toFixed(4)} TON</p>
                </div>
              )}
              {referralBonus > 0 && (
                <div className="flex justify-between items-center p-3">
                  <div>
                    <p className="font-medium">Referral Bonus</p>
                    <p className="text-xs text-gray-500">From {referrals} referrals</p>
                  </div>
                  <p className="font-semibold text-ton-primary">+{referralBonus.toFixed(2)} TON</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No reward history yet</p>
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Rewards;
