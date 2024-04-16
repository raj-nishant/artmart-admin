import React, { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";

const Product = () => {
  const [productData, setProductData] = useState(null);
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const fetchData = async () => {
      console.log(isAuthenticated());
      try {
        const jwtData = JSON.parse(localStorage.getItem("jwt"));
        const response = await fetch(
          "https://artist-shop-back-end.onrender.com/api/illustrations",
          {
            headers: {
              Authorization: `Bearer ${jwtData.jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProductData(data);
        setTimeout(() => {
          setLoading(false);
        }, 700);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!isAuthenticated()) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-center">
          Please login first to view products.
        </p>
        <Link to="/login" className="ml-4 text-blue-600 hover:underline">
          Go to Login
        </Link>
      </div>
    );
  }

  // if (isAuthenticated() && loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Box sx={{ display: "flex" }}>
  //         <CircularProgress />
  //       </Box>
  //     </div>
  //   );
  // }

  if (isAuthenticated() && loading) {
    const divElements = [];
    for (let i = 0; i < 5; i++) {
      divElements.push(
        <div
          key={i}
          className="w-full bg-gradient-to-r from-gray-200 to-gray-300 h-56 mt-7 border border-gray-300 rounded-lg animate-pulse"
        ></div>
      );
    }
    return <>{divElements}</>;
  }

  if (productData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold text-xl">
          No any product found. Please{" "}
          <Link className="text-blue-600 underline" to="/add-product">
            add products
          </Link>
          .
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {productData && isAuthenticated() && (
        <div className="mt-10 w-full">
          {productData.map((product, index) => (
            <Link key={index} to={`/products/${product.id}`}>
              <div className="px-7 py-4 border rounded-lg mb-5 shadow-md">
                <div className="flex items-center bg-white p-4 justify-between">
                  <div>
                    {product.images && product.images[0] && (
                      <img
                        src={product.images[0].url}
                        alt="no img found"
                        className="w-60 h-44 object-cover border rounded-lg"
                      />
                    )}
                    <div className="flex text-lg mt-2 justify-center">
                      <h2 className=" font-semibold text-gray-800 ">
                        {product.name} -
                      </h2>
                      <span>${product.price}</span>
                    </div>
                    {/* <p className="text-gray-600 text-center mt-3 font-bold">
                    ${product.price}
                  </p> */}
                  </div>
                  <div className="flex flex-col w-1/3">
                    <input
                      className="h-40 border rounded-md px-4 text-center"
                      type="text"
                      placeholder="Add Description of Product"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Switch {...label} />
                      <button
                        type="submit"
                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Submit for Review
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
