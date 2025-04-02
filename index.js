import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  addAuctionItem,
  findAuctionItem,
  updateAuctionItem,
  deleteAuctionItem,
  getAllItems,
} from "./controller.js";

dotenv.config();

// MongoDB Connection Configuration
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Disconnect from MongoDB
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("MongoDB disconnection error:", err);
    process.exit(1);
  }
};

// Express App Setup
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API Routes with proper error handling and disconnection
app.post("/", async (req, res) => {
  try {
    const item = await addAuctionItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    console.error("Error adding item:", err);
    res.status(500).json({ error: "Error adding item" });
  }
});

app.get("/items", async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    console.error("Error getting all items:", err);
    res.status(500).json({ error: "Error getting all items" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const { keywords } = req.query;
    if (!keywords) {
      return res.status(400).json({ error: "Keywords are required" });
    }
    const items = await findAuctionItem(keywords);
    res.status(200).json(items);
  } catch (err) {
    console.error("Error finding items:", err);
    res.status(500).json({ error: "Error finding items" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const item = await updateAuctionItem(id, req.body);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Error updating item" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const item = await deleteAuctionItem(id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).json({ error: "Error deleting item" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
