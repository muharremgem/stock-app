import { Typography, Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { btnHoverStyle } from "../styles/globalStyle";

const Products = () => {
  const { getBrands, getCategories, getProducts } = useStockCalls();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getBrands();
    getCategories();
    getProducts();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Products
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Products
      </Button>
      {/* <ProductModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} /> */}

      {products?.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 5 }} elevation={12}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Brands</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => (
                <TableRow
                  key={product.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.brand}</TableCell>
                  <TableCell align="center">{product.name}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">
                    <DeleteIcon sx={btnHoverStyle} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Products;
