
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/components/AuthContext";

// Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";

// Tool pages
import IPGeolocator from "@/pages/tools/IPGeolocator";
import URLScanner from "@/pages/tools/URLScanner";
import HashGenerator from "@/pages/tools/HashGenerator";
import DNSLookup from "@/pages/tools/DNSLookup";
import SSLChecker from "@/pages/tools/SSLChecker";
import PortScanner from "@/pages/tools/PortScanner";
import PasswordStrength from "@/pages/tools/PasswordStrength";
import SubdomainFinder from "@/pages/tools/SubdomainFinder";
import WHOISLookup from "@/pages/tools/WHOISLookup";
import NetworkCalculator from "@/pages/tools/NetworkCalculator";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/tools/ip-geolocator" element={
        <ProtectedRoute>
          <IPGeolocator />
        </ProtectedRoute>
      } />
      <Route path="/tools/url-scanner" element={
        <ProtectedRoute>
          <URLScanner />
        </ProtectedRoute>
      } />
      <Route path="/tools/hash-generator" element={
        <ProtectedRoute>
          <HashGenerator />
        </ProtectedRoute>
      } />
      <Route path="/tools/dns-lookup" element={
        <ProtectedRoute>
          <DNSLookup />
        </ProtectedRoute>
      } />
      <Route path="/tools/ssl-checker" element={
        <ProtectedRoute>
          <SSLChecker />
        </ProtectedRoute>
      } />
      <Route path="/tools/port-scanner" element={
        <ProtectedRoute>
          <PortScanner />
        </ProtectedRoute>
      } />
      <Route path="/tools/password-strength" element={
        <ProtectedRoute>
          <PasswordStrength />
        </ProtectedRoute>
      } />
      <Route path="/tools/subdomain-finder" element={
        <ProtectedRoute>
          <SubdomainFinder />
        </ProtectedRoute>
      } />
      <Route path="/tools/whois-lookup" element={
        <ProtectedRoute>
          <WHOISLookup />
        </ProtectedRoute>
      } />
      <Route path="/tools/network-calculator" element={
        <ProtectedRoute>
          <NetworkCalculator />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
