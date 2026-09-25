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

function Home() {
  return (
    <>
      <Creatorhero />
      <CategoryCards />
      <FeaturedCreators />
      <FeatureStrip />
      <StorySection />
      <Testimonial />
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
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
