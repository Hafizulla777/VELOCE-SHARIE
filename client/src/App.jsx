
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './pages/DashboardLayout';
import DashboardHome from './pages/Dashboard/DashboardHome';
import MyBookings from './pages/Dashboard/MyBookings';
import Profile from './pages/Dashboard/Profile';
import AddCar from './pages/Dashboard/Owner/AddCar';
import MyFleet from './pages/Dashboard/Owner/MyFleet';
import OwnerBookings from './pages/Dashboard/Owner/OwnerBookings';
import OwnerEarnings from './pages/Dashboard/Owner/OwnerEarnings';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ErrorBoundary from './pages/ErrorBoundary';

// This wrapper ensures Navbar and Footer ONLY show on public pages
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
        <Routes>
          {/* PUBLIC ROUTES (Has Navbar & Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* MOVED INSIDE HERE so they get the layout */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<ErrorBoundary />} />
          </Route>

          {/* CUSTOMER DASHBOARD (NO Navbar & Footer) */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardHome />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* OWNER DASHBOARD (NO Navbar & Footer) */}
          <Route path="/dashboard/owner" element={<ProtectedRoute requireOwner={true}><DashboardLayout /></ProtectedRoute>}>
            <Route path="add-car" element={<AddCar />} />
            <Route path="my-fleet" element={<MyFleet />} />
            <Route path="bookings" element={<OwnerBookings />} />
            <Route path="earnings" element={<OwnerEarnings />} />
          </Route>
        </Routes>
  );
}

export default App;