import * as React from "react";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import db from "../lib/firestore"; // Import your Firebase Firestore instance

export default function DisplayItems() {
  // array of items
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pantryItems"));
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id, // Include the document ID if needed
          ...doc.data(), // Spread the document data
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching pantry items: ", error);
      }
    };

    fetchItems();
  }, []);

  const [itemNumber, setItemNumber] = React.useState(0);

  // Handle selecting an item by itemNumber
  const selectedItem = items[itemNumber] || {};

  return (
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
            backgroundColor: "red",
            
          }}
        >
              <CardContent>
                <Typography variant="h6" component="div">
                  Pantry Item: {itemNumber}
                </Typography>
                <Typography>
                    {item.name}: {item.quantity}
                </Typography>
              </CardContent>
              </MuiCard>
            </div>
          ))}
    
      </CardContent>
    </MuiCard>
  );
}
