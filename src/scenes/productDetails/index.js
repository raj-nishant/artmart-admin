import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleImageChange(e);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtData = JSON.parse(localStorage.getItem("jwt"));
        const formData = new FormData();
        formData.append("id", id);
        const response = await fetch(
          `https://artist-shop-back-end.onrender.com/api/illustrations/${id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${jwtData.jwt}`,
            },
            body: formData,
          }
        );
        const data = await response.json();
        setData(data);
        setTitle(data?.name);
        setPrice(data?.price);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://artist-shop-back-end.onrender.com/api/illustrations/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        navigate("/products");
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("error deleting item", error);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const files = [...e.target.files];
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(urls);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const jwtData = JSON.parse(localStorage.getItem("jwt"));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    if (image) {
      formData.append("images", image);
    }

    try {
      const response = await fetch(
        `https://artist-shop-back-end.onrender.com/api/illustrations/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtData.jwt}`,
            illustration_id: id,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Update successful");
        navigate("/products");
      } else {
        console.error("Failed to update the item.");
      }
    } catch (error) {
      console.error("error updating item", error);
    }
  };

  return (
    <div className="mt-3 flex w-full justify-between">
      <div className="p-5 bg-white w-2/5 border flex-col items-center">
        {data && data.images[0]?.url && (
          <div className="md:flex h-1/2">
            <img
              className="h-1/2 object-cover md:h-full"
              src={data.images[0].url}
              alt={data.name}
            />
          </div>
        )}
        {/* <div className="h-1/2">
          <input type="file" onChange={handleImageChange} className="mt-3" />
        </div> */}
        <h1 className="text-center font-bold text-lg mt-7">Update Image</h1>
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
                To update image, Drag and drop an image here, or click to select
                files
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
      </div>

      <div className="p-10 bg-white w-1/2">
        <form className="space-y-8">
          <div>
            <label className="block font-medium italic" htmlFor="title">
              Product Title
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label className="block font-medium italic" htmlFor="description">
              Description
            </label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full"
              id="description"
              name="description"
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full italic"
              type="text"
              id="price"
              name="price"
              value={price}
              onChange={handlePriceChange}
            />
          </div>
        </form>

        <div className="flex justify-between mt-14">
          <div>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              type="submit"
            >
              Save
            </button>
          </div>

          <div>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              type="submit"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
