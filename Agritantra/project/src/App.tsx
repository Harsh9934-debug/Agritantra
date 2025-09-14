import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Solutions } from './pages/Solutions';
import { Technology } from './pages/Technology';
import { ForFarmers } from './pages/ForFarmers';
import { ForBuyers } from './pages/ForBuyers';
import { Careers } from './pages/Careers';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { FarmerDashboard } from './pages/dashboard/FarmerDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import { IoTProvider } from './contexts/IoTContext';
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <AuthProvider>
      <IoTProvider>
        <Router>
          <div className="welcom to agritantra">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex-1">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/technology" element={<Technology />} />
                <Route path="/for-farmers" element={<ForFarmers />} />
                <Route path="/for-buyers" element={<ForBuyers />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboards */}
                <Route path="/dashboard" element={<FarmerDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
            <Analytics />
          </div>
        </Router>
      </IoTProvider>
    </AuthProvider>
  );
}

export default App;
