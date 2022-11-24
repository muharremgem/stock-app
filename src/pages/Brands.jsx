import { Typography, Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BrandsCard from "../components/BrandsCard";
import BrandsModal from "../components/modals/BrandsModal";
import useStockCalls from "../hooks/useStockCalls";

//import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
//import { fetchStart, getSuccess, fetchFail } from "../features/stockSlice";

const Brands = () => {
  const { getBrands } = useStockCalls();
  const { brands } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  // const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  // const BASE_URL = "https://13671.fullstack.clarusway.com/";
  // const getBrandss = async () => {
  //   const url = "Brandss";
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios.get(`${BASE_URL}stock/Brandss/`, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     console.log(data);
  //     dispatch(getSuccess({ data, url }));
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Brands
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Brands
      </Button>

      <BrandsModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />
      {brands?.length > 0 && (
        <Grid container justifyContent="center" gap={3}>
          {brands?.map((brand) => (
            <Grid item key={brand?.id}>
              <BrandsCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Brands;
