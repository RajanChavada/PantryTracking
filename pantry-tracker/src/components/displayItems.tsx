import * as React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../lib/firestore";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function DisplayItems() {
  const [items, setItems] = React.useState<PantryItem[]>([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState<"success" | "error">("success");

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pantryItems"));
        const itemsList: PantryItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data() as Omit<PantryItem, 'id'>, // Type assertion for data
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching pantry items: ", error);
      }
    };

    fetchItems();
  }, []);

  const handleIncrement = async (id: string, currentQuantity: number) => {
    try {
      const newQuantity = currentQuantity + 1;
      await updateDoc(doc(db, "pantryItems", id), {
        quantity: newQuantity,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error incrementing item quantity", error);
      setSnackbarMessage("Error incrementing quantity. Please try again.");
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleDecrement = async (id: string, currentQuantity: number) => {
    if (currentQuantity <= 0) return; // Prevent decrementing below 0
    try {
      const newQuantity = currentQuantity - 1;
      await updateDoc(doc(db, "pantryItems", id), {
        quantity: newQuantity,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error decrementing item quantity", error);
      setSnackbarMessage("Error decrementing quantity. Please try again.");
      setSnackbarType("error");
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
            <div key={item.id}>
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
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleIncrement(item.id, item.quantity)}
                  >
                    <AddIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleDecrement(item.id, item.quantity)}
                  >
                    <RemoveIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    style={{ float: "right", padding: "5px", margin: "20px" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete Whole Item
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
