import React, { useState } from 'react';
import db from '../lib/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import { TextField, Button, Container, Snackbar, Alert } from '@mui/material';


const AddItemForm: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pantryItems'), {
        name: itemName,
        quantity: itemQuantity,
        createdAt: new Date(),
      });
      setSnackbarMessage('Item successfully added!');
      setSnackbarType('success');
      setItemName('');
      setItemQuantity('');
    } catch (error) {
      console.error("Error adding document: ", error);
      setSnackbarMessage('Error adding item. Please try again.');
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
      setTimeout(() => {
        window.location.reload(); // Or trigger a state update in a parent component
      }, 1500); // Delay in milliseconds (3000ms = 3 seconds)
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddItemForm;
