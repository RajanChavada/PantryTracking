import React from "react";
import AddItem from "./AddItem"
import { Card as MuiCard, CardContent, Typography } from "@mui/material";


const Card = () => (
  <MuiCard sx={{width:'100%', maxWidth:1000, margin:'auto', borderRadius:5}}>
    <CardContent>
      <Typography variant="h5" component="div">
        Pantry Item
      </Typography>
      <Typography variant="body2">
        Description of the pantry item goes here.
      </Typography>
      <Typography variant="body2">
        <AddItem />
      </Typography>
    </CardContent>
  </MuiCard>
);

export default Card;
