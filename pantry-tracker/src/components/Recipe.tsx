import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from "@mui/material/Button";


export default function Recipe() {
  const [recipe, setRecipe] = useState<string | null>(null);

  const handleGenerateRecipe = async () => {
    try {
      const response = await fetch('/api/llama', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            prompt: 'Generate a simple recipe using the following ingredients: apples, sugar, and flour.',
          },
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        setRecipe(result.text);
      } else {
        console.error('Failed to generate recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <MuiCard sx={{ width: "100%", maxWidth: 1000, margin: "auto", borderRadius: 5 }}>
      <CardContent>
        <Typography variant="h6">
          Recipe Generator  
          <Button variant="outlined" color="primary" style={{float:"right", margin: "20px"}} onClick={handleGenerateRecipe}>
            <RefreshIcon/> 
          </Button>
        </Typography>
        <Typography>
          Press the refresh button to generate a recipe from the items you have.
        </Typography>
        {recipe && (
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            Generated Recipe: {recipe}
          </Typography>
        )}
      </CardContent>
    </MuiCard>
  );
}
