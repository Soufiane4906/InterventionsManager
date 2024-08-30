import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import customer from "../models/customer.js"; // Update with the correct path to your customer model
import { dbConnection } from "./index.js"; // Update the path as necessary

dotenv.config();

async function seedcustomers() {
  // Establish a database connection
  await dbConnection();

  // Define customers with hashed passwords
  const salt = await bcrypt.genSalt(10);

  const customers = [
    {
      name: "Admin customer",
      title: "Administrator",
      role: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", salt), // Hashed password
      isAdmin: true,
      interventions: [],
      isActive: true,
    },
    {
      name: "Regular customer",
      title: "Technician",
      role: "customer",
      email: "customer@example.com",
      password: await bcrypt.hash("customer123", salt), // Hashed password
      isAdmin: false,
      interventions: [],
      isActive: true,
    },
  ];

  try {
    // Clear existing customers (optional)
    await customer.deleteMany();

    // Insert new customers
    await customer.insertMany(customers);

    console.log("customers seeded successfully!");
  } catch (err) {
    console.error("Error seeding customers:", err);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

// Execute the seeding function
seedcustomers();
