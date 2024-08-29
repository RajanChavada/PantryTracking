// src/components/AddItemForm.tsx

"use client";

import React, { useState } from 'react';
import { db, collection, addDoc } from '../lib/firebase';
import { TextField, Button, Container } from '@mui/material';

const AddItemForm: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pantryItems'), {
        name: itemName,
        quantity: itemQuantity,
        createdAt: new Date(),
      });
      console.log("Sent"); 
      setItemName('');
      setItemQuantity('');
    } catch (error) {
      console.error("Error adding document: ", error);
      
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Item
        </Button>
      </form>
    </Container>
  );
};

export default AddItemForm;
