import './admin.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCards from './components/CategoryCards';
import FeaturedCreators from './components/FeaturedCreators';
import FeatureStrip from './components/FeatureStrip';
import StorySection from './components/StorySection';
import Testimonial from './components/Testimonial';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import Creatorhero from "./components/Creatorhero";
import Discover from './pages/Discover';
import CreatorsPage from './pages/Creators';
import ForCreators from './pages/ForCreators';
import About from './pages/About';
import Apply from './pages/Apply';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import ContentGuidelines from './pages/ContentGuidelines';
import DMCA from './pages/DMCA';
import Takedown from './pages/Takedown';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminHero from './pages/AdminHero';
import AdminCreators from './pages/AdminCreators';
import AdminCategories from './pages/AdminCategories';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminSocialLinks from './pages/AdminSocialLinks';
import AdminContacts from './pages/AdminContacts';
import AdminSettings from './pages/AdminSettings';

function Home() {
  return (
    <>
      <Creatorhero />
      <CategoryCards />
      <FeaturedCreators />
      <FeatureStrip />
      <StorySection />
      {/* <Testimonial /> */}
      <CTASection />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          {/* <Route path="/creators" element={<CreatorsPage />} />
          <Route path="/for-creators" element={<ForCreators />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/content-guidelines" element={<ContentGuidelines />} />
          <Route path="/dmca" element={<DMCA />} />
          <Route path="/takedown" element={<Takedown />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/hero" element={<ProtectedRoute><AdminLayout><AdminHero /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/creators" element={<ProtectedRoute><AdminLayout><AdminCreators /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><AdminLayout><AdminCategories /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/social-links" element={<ProtectedRoute><AdminLayout><AdminSocialLinks /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute><AdminLayout><AdminContacts /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
