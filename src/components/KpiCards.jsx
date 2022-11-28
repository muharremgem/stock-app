import { Avatar, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { amber, indigo, pink } from "@mui/material/colors";
import { useSelector } from "react-redux";

const KpiCards = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const totalSales = sales
    ?.map((sale) => Number(sale.price_total))
    .reduce((acc, val) => acc + val, 0);
  console.log(totalSales);

  const totalPurchases = purchases
    ?.map((purchase) => Number(purchase.price_total))
    .reduce((acc, val) => acc + val, 0);

  const totalProfit = totalSales - totalPurchases;

  const data = [
    {
      title: "Sales",
      metric: `$${totalSales || 0}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "3rem" }} />,
      color: indigo[900],
      bgColor: indigo[200],
    },
    {
      title: "Profit",
      metric: `$${totalProfit || 0}`,
      icon: <PaymentsIcon sx={{ fontSize: "3rem" }} />,
      color: pink[900],
      bgColor: pink[200],
    },
    {
      title: "Purchases",
      metric: `$${totalPurchases || 0}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "3rem" }} />,
      color: amber[900],
      bgColor: amber[200],
    },
  ];
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {data.map((item) => (
        <Grid item key={item.title} sx={{ width: "400px" }}>
          <Paper sx={{ p: 2 }} elevation={10}>
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  color: item.color,
                  backgroundColor: item.bgColor,
                }}
              >
                {item.icon}
              </Avatar>
              <Box sx={{ mx: 4, flexGrow: 1 }}>
                <Typography variant="button">{item.title}</Typography>
                <Typography variant="h5">{item.metric}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
