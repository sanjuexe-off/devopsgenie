
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectWorkspace from "./pages/ProjectWorkspace";
import PromptSummaryPage from "./pages/PromptSummaryPage";
import InfrastructureCodePage from "./pages/InfrastructureCodePage";
import ArchitectureDiagramPage from "./pages/ArchitectureDiagramPage";
import FinOpsReportPage from "./pages/FinOpsReportPage";
import DocumentationPage from "./pages/DocumentationPage";
import DeploymentLogsPage from "./pages/DeploymentLogsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Main layout routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            
            {/* Authentication routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Dashboard layout routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="projects" element={<DashboardPage />} />
              <Route path="project/:projectId" element={<ProjectWorkspace />} />
              <Route path="prompts" element={<PromptSummaryPage />} />
              <Route path="infra" element={<InfrastructureCodePage />} />
              <Route path="architecture" element={<ArchitectureDiagramPage />} />
              <Route path="finops" element={<FinOpsReportPage />} />
              <Route path="docs" element={<DocumentationPage />} />
              <Route path="logs" element={<DeploymentLogsPage />} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
