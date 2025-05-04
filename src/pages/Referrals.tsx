
import React from 'react';
import Navigation from '@/components/Navigation';
import { useStaking } from '@/context/StakingContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Referrals = () => {
  const { referralCode, referrals, referralBonus, copyReferralLink } = useStaking();

  const renderReferralsList = () => {
    if (referrals === 0) return null;
    
    return Array.from({ length: referrals }).map((_, index) => (
      <div key={index} className="flex justify-between items-center p-3 border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <p className="font-medium">User{index + 1}</p>
            <p className="text-xs text-gray-500">Joined {Math.floor(Math.random() * 10) + 1} days ago</p>
          </div>
        </div>
        <p className="font-semibold text-ton-primary">+0.1 TON</p>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-center">Refer & Earn</h1>
          <p className="text-center text-gray-600">
            Invite friends and earn 0.1 TON per referral
          </p>
        </div>

        {/* Referral Card */}
        <div className="ton-card mb-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-ton-gradient opacity-10 rounded-full"></div>
          <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-ton-gradient opacity-10 rounded-full"></div>
          
          <h2 className="text-lg font-bold mb-1">Your Referral Link</h2>
          <p className="text-sm text-gray-600 mb-4">
            Share this link with your friends and earn rewards
          </p>
          
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between mb-4 relative">
            <p className="font-medium text-ton-primary">{referralCode}</p>
            <Button 
              variant="outline" 
              className="ton-button-outline h-8 py-0" 
              onClick={copyReferralLink}
            >
              Copy Link
            </Button>
          </div>
          
          <Button className="ton-button w-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            Share on Telegram
          </Button>
          
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="bg-ton-light rounded-xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Total Referrals</p>
              <p className="text-xl font-bold text-ton-primary">{referrals}</p>
            </div>
            <div className="bg-ton-light rounded-xl p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">Total Earnings</p>
              <p className="text-xl font-bold text-ton-primary">{referralBonus.toFixed(2)} TON</p>
            </div>
          </div>
        </div>

        {/* How Referrals Work */}
        <div className="ton-card mb-6">
          <h2 className="text-lg font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-ton-light text-ton-primary flex items-center justify-center font-bold mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Share Your Link</h3>
                <p className="text-sm text-gray-600">Send your referral link to friends</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-ton-light text-ton-primary flex items-center justify-center font-bold mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Friends Join & Stake</h3>
                <p className="text-sm text-gray-600">When they join and stake TON</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-ton-light text-ton-primary flex items-center justify-center font-bold mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Earn Bonus TON</h3>
                <p className="text-sm text-gray-600">You receive 0.1 TON for each referral</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral List */}
        <Card className="mb-6">
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4">Your Referrals</h2>
            {referrals > 0 ? (
              <div className="space-y-1">
                {renderReferralsList()}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 mb-4">You haven't referred anyone yet</p>
                <Button className="ton-button">
                  Invite Friends
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Navigation />
    </div>
  );
};

export default Referrals;
