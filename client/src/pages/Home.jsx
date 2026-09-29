import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import FAQ from '../components/FAQ'
import Carousel from '../components/Carousel'

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Carousel />
      <Testimonial />
      <FAQ />
      <Newsletter />
    </>
  );
};


export default Home

