import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Home Page Sections
import Hero from '../components/Hero';
import Announcement from '../components/Announcement';
import Welcome from '../components/Welcome';
import Features from '../components/Features';
import Story from '../components/Story';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Welcome />
      <Features />
      <Story />
    </>
  );
};

export default Home;