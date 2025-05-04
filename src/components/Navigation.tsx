
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStaking } from '@/context/StakingContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const { balance } = useStaking();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed w-full bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-md mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <NavigationItem
            to="/"
            icon="home"
            label="Home"
            isActive={isActive('/')}
          />
          <NavigationItem
            to="/stake"
            icon="stake"
            label="Stake"
            isActive={isActive('/stake')}
          />
          <NavigationItem
            to="/rewards"
            icon="rewards"
            label="Rewards"
            isActive={isActive('/rewards')}
          />
          <NavigationItem
            to="/referrals"
            icon="referrals"
            label="Refer"
            isActive={isActive('/referrals')}
          />
        </div>
      </div>
      
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-md mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-ton-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">TON</span>
            </div>
            <span className="ml-2 font-semibold">TON Staking</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
            <span className="text-ton-dark font-medium">{balance.toFixed(2)} TON</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavigationItemProps {
  to: string;
  icon: string;
  label: string;
  isActive: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center px-2 py-1 ${
        isActive ? 'text-ton-primary' : 'text-gray-500'
      }`}
    >
      <div className="w-6 h-6 mb-1">
        {icon === 'home' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        )}
        {icon === 'stake' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="6"></circle>
            <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
            <path d="M7 6h1v4"></path>
            <path d="m16.71 13.88.7.71-2.82 2.82"></path>
          </svg>
        )}
        {icon === 'rewards' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
          </svg>
        )}
        {icon === 'referrals' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        )}
      </div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default Navigation;
