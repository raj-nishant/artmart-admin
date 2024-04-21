import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const AddProduct = () => {
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productStatus, setProductStatus] = useState("draft");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e);
  };
  const handleImageChange = (e) => {
    const files = [...e.target.files];
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(urls);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const originalFormData = new FormData(e.target);
    const formData = new FormData();
    formData.append("title", originalFormData.get("title"));
    formData.append("price", originalFormData.get("price"));
    formData.append("images", originalFormData.get("images"));
    console.log(formData);
    setLoading(true);

    try {
      const jwtData = JSON.parse(localStorage.getItem("jwt"));
      const response = await fetch(
        "https://artist-shop-back-end.onrender.com/api/illustrations/new",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtData.jwt}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      setLoading(false);
      navigate("/products");
      return await response.json();
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography
        variant="h3" // Adjusts the size, h4 is an example that makes it larger
        component="h1" // Semantic element
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 4,
        }}
      >
        Add Products
      </Typography>
      <Paper elevation={2} sx={{ p: 3 }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Title"
            id="title"
            name="title"
            variant="outlined"
            margin="normal"
          />
          {/* <TextField
            fullWidth
            label="Sub Text"
            id="sub-text"
            name="subText"
            variant="outlined"
            margin="normal"
          /> */}
          <FormControl fullWidth margin="normal">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Please Select</em>
              </MenuItem>
              {/* Populate this MenuItem list with your categories */}
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Price"
            id="price"
            name="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            variant="outlined"
            margin="normal"
          />
          {/* <TextField
            fullWidth
            label="Discount"
            id="discount"
            name="discount"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            variant="outlined"
            margin="normal"
          /> */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Status</FormLabel>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
            >
              <FormControlLabel
                value="published"
                control={<Radio />}
                label="Published"
              />
              <FormControlLabel
                value="draft"
                control={<Radio />}
                label="Draft"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            label="Product Description"
            id="product-description"
            name="productDescription"
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />

          <Typography variant="h6" gutterBottom component="div" sx={{ mt: 2 }}>
            Product Image
          </Typography>
          <Box
            sx={{
              mt: 2,
              p: 4,
              border: "2px dashed gray",
              borderRadius: "4px",
              position: "relative",
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "background.paper",
              color: "text.secondary",
              "&:hover": {
                bgcolor: "background.default",
              },
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label htmlFor="contained-button-file">
              <Input
                name="images"
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 48 }} />
                <Typography variant="body1">
                  Drag and drop an image here, or click to select files
                </Typography>
              </Box>
            </label>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              mt: 2,
              justifyContent: "center",
            }}
          >
            {imagePreviewUrls.map((url, index) => (
              <Box key={index} sx={{ m: 1 }}>
                <Paper elevation={4} sx={{ overflow: "hidden" }}>
                  <img
                    src={url}
                    alt={`Preview ${index}`}
                    style={{ width: 120, height: 120, objectFit: "cover" }}
                  />
                </Paper>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1500,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default AddProduct;
