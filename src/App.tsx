// src/App.tsx
// O que mudou vs. versão anterior:
//   • Removido QueryClientProvider e @tanstack/react-query (não havia uso)
//   • Removido next-themes (dark mode não estava implementado)
//   • Mantidos Toaster, Sonner e TooltipProvider — continuam necessários para
//     shadcn/ui funcionar corretamente caso você adicione toasts no futuro
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import UnitPage from "./pages/UnitPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { units } from "./data/units.config";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {units.map((unit) => (
          <Route key={unit.slug} path={`/${unit.slug}`} element={<UnitPage unit={unit} />} />
        ))}
        {/* ADICIONE NOVAS ROTAS ACIMA DESTA LINHA */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
