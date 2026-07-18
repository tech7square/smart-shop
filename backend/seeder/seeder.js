import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

const seedProducts = async () => {
  try {
    const dbUri = process.env.DB_LOCAL_URI || process.env.DB_URI;
    if (!dbUri) {
      throw new Error("No database connection URI found in environment variables.");
    }

    await mongoose.connect(dbUri);

    await Product.deleteMany();
    console.log("Products are deleted");

    const productsWithUser = products.map((product) => ({
      ...product,
      user: "5f9d7a3a9d3e2a1b2c3d4e5f", // dummy admin user ID
    }));

    await Product.insertMany(productsWithUser);
    console.log("Products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
