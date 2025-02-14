
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Design from "./pages/Design";
import CodeGeneration from "./pages/CodeGeneration";
import Testing from "./pages/Testing";
import Deployment from "./pages/Deployment";
import Monitoring from "./pages/Monitoring";
import Flow from "./pages/Flow";
import Data from "./pages/Data";
import Knowledge from "./pages/Knowledge";
import Auth from "./pages/Auth";
import React from 'react';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/domain"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/data"
                element={
                  <ProtectedRoute>
                    <Data />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/knowledge"
                element={
                  <ProtectedRoute>
                    <Knowledge />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/flow"
                element={
                  <ProtectedRoute>
                    <Flow />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/design"
                element={
                  <ProtectedRoute>
                    <Design />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/code"
                element={
                  <ProtectedRoute>
                    <CodeGeneration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/testing"
                element={
                  <ProtectedRoute>
                    <Testing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deployment"
                element={
                  <ProtectedRoute>
                    <Deployment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monitoring"
                element={
                  <ProtectedRoute>
                    <Monitoring />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
