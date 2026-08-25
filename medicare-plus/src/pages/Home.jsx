import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';

const Home = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Features />
      <Stats />
    </div>
  );
};

export default Home;
