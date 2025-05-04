
import React from 'react';
import Navigation from '@/components/Navigation';
import { useStaking } from '@/context/StakingContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Stake = () => {
  const { 
    balance, 
    stakedAmount, 
    rewards, 
    isStaking, 
    stakeTokens, 
    unstakeTokens,
    claimRewards,
    timeRemaining
  } = useStaking();

  const progressPercentage = (rewards / 2) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-center">Stake TON</h1>
          <p className="text-center text-gray-600">
            Stake your TON and earn 100% returns over time
          </p>
        </div>

        {/* Staking Card */}
        <div className="ton-card mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Staking Overview</h2>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <p className="text-xl font-bold">{balance.toFixed(2)} TON</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Staked</p>
                  <p className="text-xl font-bold">{stakedAmount} TON</p>
                </div>
              </div>
            </div>
          </div>

          {isStaking ? (
            <div>
              <div className="bg-ton-light rounded-xl p-4 mb-4">
                <h3 className="font-medium mb-2">Active Staking</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">Staked Amount</p>
                  <p className="font-semibold">{stakedAmount} TON</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">Expected Return</p>
                  <p className="font-semibold">+2 TON (100%)</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-gray-600">Current Rewards</p>
                  <p className="text-ton-primary font-bold">{rewards.toFixed(4)} TON</p>
                </div>
                <Progress value={progressPercentage} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>0 TON</span>
                  <span className="font-medium text-ton-primary">{timeRemaining}</span>
                  <span>2 TON</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="ton-button-outline" 
                    onClick={unstakeTokens}
                  >
                    Unstake
                  </Button>
                  <Button 
                    className="ton-button" 
                    onClick={claimRewards}
                    disabled={rewards <= 0}
                  >
                    Claim Rewards
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <h3 className="font-medium mb-4 text-center">Staking Package</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600">Stake Amount</p>
                  <p className="font-semibold">2 TON</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600">Duration</p>
                  <p className="font-semibold">4 minutes</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-gray-600">Expected Return</p>
                  <p className="text-ton-primary font-semibold">+2 TON (100%)</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Total Return</p>
                  <p className="font-bold">4 TON</p>
                </div>
                <Button 
                  className="ton-button w-full" 
                  onClick={stakeTokens}
                  disabled={balance < 2}
                >
                  Stake 2 TON Now
                </Button>
                {balance < 2 && (
                  <p className="text-red-500 text-xs mt-2 text-center">
                    Insufficient balance. You need at least 2 TON to stake.
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-2">Staking Benefits</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ton-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    100% guaranteed returns
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ton-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    Real-time reward tracking
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ton-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    Instant unstaking available
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="ton-card mb-6">
          <h2 className="text-lg font-bold mb-4">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">How much can I stake?</h3>
              <p className="text-sm text-gray-600">For this demo, you can stake exactly 2 TON.</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">How long is the staking period?</h3>
              <p className="text-sm text-gray-600">The staking period is 4 minutes for demonstration purposes.</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Can I withdraw early?</h3>
              <p className="text-sm text-gray-600">Yes, you can unstake your TON at any time, but you'll only receive rewards earned up to that point.</p>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Stake;
