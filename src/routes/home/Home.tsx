
import React from 'react';
import Nav from '../../components/nav/Nav';
import Hero from '../../components/hero/Hero';
import Categories from '../../components/categories/Categories';
import Content from '../../components/contents/Content';

const Home: React.FC = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <Categories />
      <Content />
    </div>
  );
};

export default Home;
