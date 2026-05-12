import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Enquiry from "./components/Enquiry";
import CCTVSurveillance from "./components/product/CCTVSurveillance";
import BiometricSystems from "./components/product/BiometricSystems";
import NetworkingSolutions from "./components/product/NetworkingSolutions";
import Epabx from "./components/product/Epabx";
import SecuritySolution from "./components/product/SecuritySolution";
import HomeAutomation from "./components/product/HomeAutomation";
// dashboard
import Profile from "./components/pages/dashboard/settings/Profile";
import Support from "./components/pages/dashboard/Support";
import Security from "./components/pages/dashboard/settings/Security";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import TwoFa from "./components/auth/TwoFa";
import DashboardLayout from "./components/pages/components/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import Settings from "./components/pages/dashboard/Settings";
import Users from "./components/pages/dashboard/Users";
import Blogs from "./components/pages/dashboard/Blogs";
import Project from "./components/pages/dashboard/Project";
import Category from "./components/pages/dashboard/Category"; // category import
import Department from "./components/pages/dashboard/Department"; // department import
// Customer import
import Customer from "./components/pages/dashboard/Customer";
// Correct ServiceCall import for "/dashboard/service-call"
import ServiceCall from "./components/pages/dashboard/ServiceCall";
import CallSlip from "./components/pages/dashboard/CallSlip";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");
  const hideFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/work" element={<Work />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/services" element={<Services />} />
        <Route path="/pages/products" element={<Products />} />
        <Route path="/components/enquiry" element={<Enquiry />} />
        <Route path="/product/cctv-surveillance" element={<CCTVSurveillance />} />
        <Route path="/product/biometric-systems" element={<BiometricSystems />} />
        <Route path="/product/networking-solutions" element={<NetworkingSolutions />} />
        <Route path="/product/epabx" element={<Epabx />} />
        <Route path="/product/security-solution" element={<SecuritySolution />} />
        <Route path="/product/home-automation" element={<HomeAutomation />} />

        {/* Login Route - Accessible without authentication */}
        <Route path="/login" element={<Login />} />
        {/* Signup Route - Accessible without authentication */}
        <Route path="/signup" element={<Signup />} />
        {/* TwoFa Route - Accessible without authentication */}
        <Route path="/twofa" element={<TwoFa />} />

        {/* Dashboard routes - all protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings/security"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Security />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/support"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Support />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Users />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/customer"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Customer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/blogs"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Blogs />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/project"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Project />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/category"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Category />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/department"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Department />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* Correct service call route */}
        <Route
          path="/dashboard/service-call"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ServiceCall />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/callslip"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CallSlip />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;