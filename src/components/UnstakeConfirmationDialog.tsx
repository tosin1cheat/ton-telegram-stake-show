
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface UnstakeConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  balance: number;
  stakedAmount: number;
  rewards: number;
}

const UnstakeConfirmationDialog: React.FC<UnstakeConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  balance,
  stakedAmount,
  rewards,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Unstaking Transaction</DialogTitle>
          <DialogDescription>
            Please review the unstaking details before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Wallet Balance</span>
            <span className="font-medium">{balance.toFixed(2)} TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Staked Amount</span>
            <span className="font-medium">{stakedAmount} TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Rewards</span>
            <span className="font-medium text-primary">{rewards.toFixed(4)} TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Withdrawal Fee</span>
            <span className="font-medium text-destructive">0.5 TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Return</span>
            <span className="font-bold">{(stakedAmount + rewards).toFixed(4)} TON</span>
          </div>
          {balance < 0.5 && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              Insufficient wallet balance for withdrawal fee. You need at least 0.5 TON.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading || balance < 0.5}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Unstake"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnstakeConfirmationDialog;
