import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { amber, indigo, pink } from "@mui/material/colors";

const KpiCards = () => {
  const data = [
    {
      title: "Sales",
      metric: "$0",
      icon: <MonetizationOnIcon />,
      color: indigo[900],
      bgColor: indigo[300],
    },
    {
      title: "Profit",
      metric: "$0",
      icon: <PaymentsIcon />,
      color: pink[900],
      bgColor: pink[300],
    },
    {
      title: "Purchase",
      metric: "$0",
      icon: <ShoppingCartIcon />,
      color: amber[900],
      bgColor: amber[300],
    },
  ];
  return (
    <Grid container>
      {data.map((item) => (
        <Grid item>
          <Paper>
            <Box>
              <Avatar></Avatar>
              <Box>
                <Typography></Typography>
                <Typography></Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
