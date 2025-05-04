
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export const useReferrals = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState(0);
  const [referralBonus, setReferralBonus] = useState(0);
  
  // Generate a unique referral code on initial load
  useEffect(() => {
    const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    setReferralCode(randomCode);
    
    // Simulate some random referrals for demo purposes
    const randomReferrals = Math.floor(Math.random() * 5);
    setReferrals(randomReferrals);
    setReferralBonus(randomReferrals * 0.1); // 0.1 TON bonus per referral
  }, []);
  
  const copyReferralLink = () => {
    const referralLink = `https://ton-staking.demo/${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard");
  };
  
  return {
    referralCode,
    referrals,
    referralBonus,
    copyReferralLink
  };
};
