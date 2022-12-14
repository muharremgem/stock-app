import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import { TextField } from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";

export default function BrandsModal({ open, setOpen, info, setInfo }) {
  const { postBrands, putBrands } = useStockCalls();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putBrands(info);
    } else {
      postBrands(info);
    }
    setOpen(false);
    setInfo({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setInfo({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box component="form" onSubmit={handleSubmit} sx={flexColumn}>
            <TextField
              label="Brands Name *"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name || ""}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image Url"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info?.image || ""}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" size="large">
              Submit Brands
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
