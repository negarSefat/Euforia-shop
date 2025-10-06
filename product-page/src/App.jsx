// import { useState } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import Navbar from './assets/component/Navbar';
import Header from './assets/component/Header';
import Cards from './assets/component/Cards';
import BasicCard from './assets/component/BasicCard';
import Footer from './assets/component/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <div
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 50,
          marginBottom: 20,
        }}
      >
        Our Collection
      </div>
      <Cards />
      <Footer />
    </>
  );
}

export default App;
