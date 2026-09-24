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
import Discover from './pages/Discover';
import CreatorsPage from './pages/Creators';
import ForCreators from './pages/ForCreators';
import About from './pages/About';
import Creatorhero from "./components/Creatorhero"

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
          <Route path="/creators" element={<CreatorsPage />} />
          <Route path="/for-creators" element={<ForCreators />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
