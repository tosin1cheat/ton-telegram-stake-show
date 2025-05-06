
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { useStaking } from '@/context/StakingContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link, Unlink, Loader } from 'lucide-react';
import StakeConfirmationDialog from '@/components/StakeConfirmationDialog';
import UnstakeConfirmationDialog from '@/components/UnstakeConfirmationDialog';

const Stake = () => {
  const { 
    balance, 
    stakedAmount, 
    rewards, 
    isStaking, 
    stakeTokens, 
    unstakeTokens,
    timeRemaining,
    walletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    isLoading
  } = useStaking();

  // Dialog states
  const [stakeDialogOpen, setStakeDialogOpen] = useState(false);
  const [unstakeDialogOpen, setUnstakeDialogOpen] = useState(false);
  
  // Handlers for the dialog actions
  const handleStakeClick = () => {
    if (walletConnected && balance >= 2.5) {
      setStakeDialogOpen(true);
    }
  };
  
  const handleUnstakeClick = () => {
    if (canUnstake && balance >= 0.5) {
      setUnstakeDialogOpen(true);
    }
  };
  
  const handleConfirmStake = () => {
    stakeTokens();
    setStakeDialogOpen(false);
  };
  
  const handleConfirmUnstake = () => {
    unstakeTokens();
    setUnstakeDialogOpen(false);
  };

  const progressPercentage = (rewards / 2) * 100;
  const canUnstake = isStaking && Date.now() >= (useStaking().stakingEndTime || 0);

  return (
    <div className="min-h-screen bg-sidebar text-sidebar-foreground pt-16 pb-20">
      <div className="max-w-md mx-auto px-4">
        <div className="mb-6 mt-4">
          <h1 className="text-2xl font-bold text-center">Stake TON</h1>
          <p className="text-center text-muted-foreground">
            Stake your TON and earn 100% returns over time
          </p>
        </div>

        {/* Wallet Connection Card */}
        <div className="mb-6 bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl animate-fade-in">
          <h2 className="text-lg font-bold mb-4">Wallet Connection</h2>
          <div className="flex items-center justify-between mb-4">
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
          {walletConnected && (
            <div className="flex justify-between items-center bg-muted rounded-lg p-3">
              <span className="text-sm">Available Balance</span>
              <span className="font-bold">{balance.toFixed(2)} TON</span>
            </div>
          )}
        </div>

        {/* Staking Card */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl mb-6 animate-fade-in">
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Staking Overview</h2>
            <div className="bg-muted rounded-xl p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-xl font-bold">{balance.toFixed(2)} TON</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Staked</p>
                  <p className="text-xl font-bold">{stakedAmount} TON</p>
                </div>
              </div>
            </div>
          </div>

          {isStaking ? (
            <div>
              <div className="bg-accent/20 rounded-xl p-4 mb-4">
                <h3 className="font-medium mb-2">Active Staking</h3>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Staked Amount</p>
                  <p className="font-semibold">{stakedAmount} TON</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">Expected Return</p>
                  <p className="font-semibold">+2 TON (100%)</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-sm text-muted-foreground">Current Rewards</p>
                  <p className="text-primary font-bold">{rewards.toFixed(4)} TON</p>
                </div>
                <Progress value={progressPercentage} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>0 TON</span>
                  <span className="font-medium text-primary animate-pulse">{timeRemaining}</span>
                  <span>2 TON</span>
                </div>
                <Button 
                  className="bg-primary text-primary-foreground w-full" 
                  onClick={handleUnstakeClick}
                  disabled={!canUnstake || isLoading || balance < 0.5}
                >
                  {isLoading ? <Loader className="animate-spin mr-2" size={16} /> : null}
                  {canUnstake ? "Unstake with Rewards" : "Locked"}
                </Button>
                {!canUnstake && isStaking && (
                  <p className="text-muted-foreground text-xs mt-2 text-center">
                    Staking is locked until the countdown reaches zero
                  </p>
                )}
                {canUnstake && balance < 0.5 && (
                  <p className="text-destructive text-xs mt-2 text-center">
                    Insufficient balance for 0.5 TON withdrawal fee
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="border border-border rounded-xl p-6 mb-6">
                <h3 className="font-medium mb-4 text-center">Staking Package</h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-muted-foreground">Stake Amount</p>
                  <p className="font-semibold">2 TON</p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-semibold">60 seconds <span className="text-xs text-muted-foreground">(simulates 6 hours)</span></p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-muted-foreground">Stake Fee</p>
                  <p className="text-destructive font-semibold">0.5 TON <span className="text-xs">(from wallet)</span></p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-muted-foreground">Withdraw Fee</p>
                  <p className="text-destructive font-semibold">0.5 TON <span className="text-xs">(from wallet)</span></p>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-muted-foreground">Expected Reward</p>
                  <p className="text-primary font-semibold">+2 TON (100%)</p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-muted-foreground">Total Cost Now</p>
                  <p className="font-bold">2.5 TON <span className="text-xs text-muted-foreground">(2 TON + 0.5 TON fee)</span></p>
                </div>
                <Button 
                  className="bg-primary text-primary-foreground w-full" 
                  onClick={handleStakeClick}
                  disabled={balance < 2.5 || !walletConnected || isLoading}
                >
                  {isLoading ? <Loader className="animate-spin mr-2" size={16} /> : null}
                  Stake 2 TON Now
                </Button>
                {balance < 2.5 && walletConnected && (
                  <p className="text-destructive text-xs mt-2 text-center">
                    Insufficient balance. You need at least 2.5 TON to stake.
                  </p>
                )}
                {!walletConnected && (
                  <p className="text-destructive text-xs mt-2 text-center">
                    Please connect your wallet first.
                  </p>
                )}
              </div>

              <div className="bg-muted rounded-xl p-4">
                <h3 className="font-medium mb-2">Staking Benefits</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    100% guaranteed returns
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    Real-time reward tracking
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    Available at the end of staking period
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 border border-border transition-all hover:shadow-xl mb-6 animate-fade-in">
          <h2 className="text-lg font-bold mb-4">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">How much can I stake?</h3>
              <p className="text-sm text-muted-foreground">For this demo, you can stake exactly 2 TON.</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">How long is the staking period?</h3>
              <p className="text-sm text-muted-foreground">The staking period is 60 seconds for demonstration purposes (represents 6 hours).</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Can I withdraw early?</h3>
              <p className="text-sm text-muted-foreground">No, you must wait until the staking period is complete to withdraw your tokens.</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Are there any fees?</h3>
              <p className="text-sm text-muted-foreground">Yes, there's a 0.5 TON fee for staking and a 0.5 TON fee for withdrawals, both paid from your wallet.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialogs */}
      <StakeConfirmationDialog 
        open={stakeDialogOpen}
        onOpenChange={setStakeDialogOpen}
        onConfirm={handleConfirmStake}
        isLoading={isLoading}
        balance={balance}
      />
      
      <UnstakeConfirmationDialog
        open={unstakeDialogOpen}
        onOpenChange={setUnstakeDialogOpen}
        onConfirm={handleConfirmUnstake}
        isLoading={isLoading}
        balance={balance}
        stakedAmount={stakedAmount}
        rewards={rewards}
      />
      
      <Navigation />
    </div>
  );
};

export default Stake;
