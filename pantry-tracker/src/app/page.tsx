// app/page.tsx
import React from "react";
import Divider from '@mui/material/Divider';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";






const Home = () => (
  <main>
    <Header />
    <section className="title">
      <h1>My Pantry</h1>
      <Divider />
    </section>
    <section className="card">
      <Card />
    </section>
    
    <Footer />
    
  </main>
);

export default Home;
