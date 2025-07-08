
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import ProductImport from "./pages/ProductImport";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Fulfillment from "./pages/Fulfillment";
import Analytics from "./pages/Analytics";
import Stores from "./pages/Stores";
import Settings from "./pages/Settings";
import PaymentDashboard from "./pages/PaymentDashboard";
import StoreBuilder from "./pages/StoreBuilder";
import Storefront from "./pages/Storefront";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/import" element={<Layout><ProductImport /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/orders" element={<Layout><Orders /></Layout>} />
            <Route path="/fulfillment" element={<Layout><Fulfillment /></Layout>} />
            <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
            <Route path="/stores" element={<Layout><Stores /></Layout>} />
            <Route path="/store-builder" element={<Layout><StoreBuilder /></Layout>} />
            <Route path="/storefront" element={<Layout><Storefront /></Layout>} />
            <Route path="/payments" element={<Layout><PaymentDashboard /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
