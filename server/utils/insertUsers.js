import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.js"; // Update with the correct path to your User model
import { dbConnection } from "../utils/index.js"; // Update the path as necessary

dotenv.config();

async function seedUsers() {
  // Establish a database connection
  await dbConnection();

  // Define users with hashed passwords
  const salt = await bcrypt.genSalt(10);

  const users = [
    {
      name: "Admin User",
      title: "Administrator",
      role: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", salt), // Hashed password
      isAdmin: true,
      interventions: [],
      isActive: true,
    },
    {
      name: "Regular User",
      title: "Technician",
      role: "user",
      email: "user@example.com",
      password: await bcrypt.hash("user123", salt), // Hashed password
      isAdmin: false,
      interventions: [],
      isActive: true,
    },
  ];

  try {
    // Clear existing users (optional)
    await User.deleteMany();

    // Insert new users
    await User.insertMany(users);

    console.log("Users seeded successfully!");
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

// Execute the seeding function
seedUsers();
