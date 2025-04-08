
import { Navigate } from "react-router-dom";
import LandingPage from "./LandingPage";

const Index = () => {
  // We're now rendering the LandingPage directly from Index
  // This ensures that the landing page is shown when visiting the root URL
  return <LandingPage />;
};

export default Index;
