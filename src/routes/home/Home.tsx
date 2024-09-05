// pages/home/Home.tsx
import React from 'react';
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Footer from '../../components/footer/Footer';
import Categories from '../../components/categories/Categories';
import Content from '../../components/contents/Content';

const Home: React.FC = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Categories />
      <Content />
      <Footer />
    </div>
  );
};

export default Home;
