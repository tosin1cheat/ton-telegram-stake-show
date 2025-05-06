
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
import { Loader, Coins } from "lucide-react";

interface StakeConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  balance: number;
}

const StakeConfirmationDialog: React.FC<StakeConfirmationDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  balance,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 rounded-full bg-ton-gradient flex items-center justify-center mr-2">
              <Coins className="text-white h-5 w-5" />
            </div>
            <DialogTitle className="text-xl">Stake TON</DialogTitle>
          </div>
          <DialogDescription>
            Please review the staking details before proceeding.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Wallet Balance</span>
            <span className="font-medium">{balance.toFixed(2)} TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Stake Amount</span>
            <span className="font-medium">2 TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Transaction Fee</span>
            <span className="font-medium text-destructive">0.5 TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Cost</span>
            <span className="font-bold">2.5 TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Expected Return</span>
            <span className="font-medium text-primary">4 TON</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">60 seconds (simulates 6 hours)</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isLoading || balance < 2.5} className="bg-primary text-white">
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Stake"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StakeConfirmationDialog;
