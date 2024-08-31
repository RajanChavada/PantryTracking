import * as React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../lib/firestore";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function DisplayItems() {
  const [items, setItems] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState<'success' | 'error'>('success');

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pantryItems"));
        const itemsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching pantry items: ", error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "pantryItems", id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setSnackbarMessage('Item successfully deleted!');
      setSnackbarType('success');
    } catch (error) {
      console.error("Error deleting item", error);
      setSnackbarMessage('Error deleting item. Please try again.');
      setSnackbarType('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <MuiCard
        sx={{ width: "100%", maxWidth: 1000, margin: "auto", borderRadius: 5 }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            Pantry List
          </Typography>
          <Typography variant="body2">List of Pantry Items</Typography>
          {items.map((item, index) => (
            <div key={index}>
              <MuiCard
                sx={{
                  width: "100%",
                  maxWidth: 1000,
                  margin: "10px auto",
                  backgroundColor: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    Pantry Item: {index + 1}
                  </Typography>
                  <Typography>
                    {item.name}: {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ float: "right", padding: "5px", margin: "20px" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete Item
                  </Button>
                </CardContent>
              </MuiCard>
            </div>
          ))}
        </CardContent>
      </MuiCard>

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
    </div>
  );
}
