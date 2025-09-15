import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Transactions from "./pages/Transactions";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check onboarding status on mount
    const checkOnboardingStatus = () => {
      const onboarded = localStorage.getItem("smartspend_onboarded") === "true";
      setHasOnboarded(onboarded);
      setIsLoading(false);
    };

    checkOnboardingStatus();

    // Listen for storage changes (in case user completes onboarding in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "smartspend_onboarded") {
        setHasOnboarded(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Show loading spinner while checking onboarding status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                hasOnboarded ? 
                  <Layout /> : 
                  <Navigate to="/onboarding" replace />
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="chat" element={<Chat />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route 
              path="/onboarding" 
              element={
                hasOnboarded ? 
                  <Navigate to="/" replace /> : 
                  <Onboarding onComplete={() => setHasOnboarded(true)} />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
