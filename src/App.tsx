import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/ui/bottom-nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChatBot from "./pages/ChatBot";
import GoalManagement from "./pages/GoalManagement";
import GoalDetail from "./pages/GoalDetail";
import Calendar from "./pages/Calendar";
import HabitTracker from "./pages/HabitTracker";
import GratitudeJournal from "./pages/GratitudeJournal";
import Customize from "./pages/Customize";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/goals" element={<GoalManagement />} />
              <Route path="/goals/:goalId" element={<GoalDetail />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/habit-tracker" element={<HabitTracker />} />
              <Route path="/gratitude-journal" element={<GratitudeJournal />} />
              <Route path="/customize" element={<Customize />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
