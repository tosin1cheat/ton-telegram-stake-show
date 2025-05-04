
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StakingProvider } from "@/context/StakingContext";
import Index from "./pages/Index";
import Stake from "./pages/Stake";
import Rewards from "./pages/Rewards";
import Referrals from "./pages/Referrals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StakingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StakingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
