// app/page.tsx
"use client"

import React from "react";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Recipe from '../components/Recipe'
// import AddItemForm from "../components/AddItemForm";
import DisplayItems from "../components/DisplayItems"; // Assuming you have a component to display pantry items

const Home = () => (
  <main>
    <Header />
    <section className="title">
      <h1>My Pantry</h1>
      <Divider />
    </section>

    <Grid container spacing={3} style={{ padding: '0 35px' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <DisplayItems />
      </Grid>
      <Grid item xs={12}>
        <Recipe />
      </Grid>
    </Grid>
    <Footer />
  </main>
);

export default Home;
