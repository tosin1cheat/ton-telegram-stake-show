
import React from 'react';
import Navigation from '@/components/Navigation';
import { useStaking } from '@/context/StakingContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { balance, stakedAmount, rewards, isStaking, timeRemaining } = useStaking();

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-8 mt-4">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome to TON Staking</h1>
          <p className="text-center text-gray-600">
            Stake 2 TON, earn 4 TON in just 4 minutes!
          </p>
        </div>

        {/* Main Stats Card */}
        <div className="ton-card mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm">Available Balance</p>
              <p className="text-xl font-bold">{balance.toFixed(2)} TON</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm">Total Value</p>
              <p className="text-xl font-bold">
                {(balance + stakedAmount + rewards).toFixed(2)} TON
              </p>
            </div>
          </div>

          {isStaking ? (
            <div className="bg-ton-light rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-700 font-medium">Currently Staking</p>
                <p className="text-ton-primary font-bold">{stakedAmount} TON</p>
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-700 font-medium">Rewards Earned</p>
                <p className="text-ton-primary font-bold">{rewards.toFixed(4)} TON</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-ton-gradient h-2 rounded-full animate-pulse-glow"
                  style={{ 
                    width: `${(rewards / 2) * 100}%`,
                    transition: 'width 1s ease-in-out' 
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 TON</span>
                <span className="font-medium text-ton-primary">{timeRemaining}</span>
                <span>2 TON</span>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 mb-4 text-center">
              <p className="text-gray-700 mb-2">Start staking to earn rewards</p>
              <p className="text-xl font-bold text-ton-primary mb-4">Earn up to 100% APY</p>
              <Link to="/stake">
                <Button className="ton-button w-full">Start Staking Now</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/stake" className="ton-card hover:border-ton-primary">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-ton-light flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ton-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="8" r="6"></circle>
                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                    <path d="M7 6h1v4"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Stake TON</h3>
                <p className="text-xs text-gray-500">Earn passive income</p>
              </div>
            </Link>
            <Link to="/rewards" className="ton-card hover:border-ton-primary">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-ton-light flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ton-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Rewards</h3>
                <p className="text-xs text-gray-500">Track your earnings</p>
              </div>
            </Link>
            <Link to="/referrals" className="ton-card hover:border-ton-primary">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-ton-light flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ton-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">Referrals</h3>
                <p className="text-xs text-gray-500">Invite friends & earn</p>
              </div>
            </Link>
            <div className="ton-card">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-ton-light flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ton-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                  </svg>
                </div>
                <h3 className="font-medium mb-1">High APY</h3>
                <p className="text-xs text-gray-500">100% returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="ton-card mb-8">
          <h2 className="text-lg font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-ton-light text-ton-primary flex items-center justify-center font-bold mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Stake Your TON</h3>
                <p className="text-sm text-gray-600">Stake exactly 2 TON to start earning rewards</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-ton-light text-ton-primary flex items-center justify-center font-bold mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Watch Rewards Grow</h3>
                <p className="text-sm text-gray-600">See your rewards accumulate in real-time</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-ton-light text-ton-primary flex items-center justify-center font-bold mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Claim Your Returns</h3>
                <p className="text-sm text-gray-600">After 4 minutes, receive your initial 2 TON plus 2 TON as profit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
