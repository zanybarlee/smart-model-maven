
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/domain" element={<Index />} />
            <Route path="/data" element={<Data />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/flow" element={<Flow />} />
            <Route path="/design" element={<Design />} />
            <Route path="/code" element={<CodeGeneration />} />
            <Route path="/testing" element={<Testing />} />
            <Route path="/deployment" element={<Deployment />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
