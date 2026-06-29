import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import BrandSlider from '../components/BrandSlider/BrandSlider';
import Stats from '../components/Stats/Stats';
import FeaturedCars from '../components/FeaturedCars/FeaturedCars';
import WhyChoose from '../components/WhyChoose/WhyChoose';
import Testimonials from '../components/Testimonials/Testimonials';


const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen antialiased selection:bg-primary-500/30 selection:text-primary-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <BrandSlider />
        <Stats />
        <FeaturedCars />
        <WhyChoose />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;