import mongoose from "mongoose";
import AuctionItems from "./models/AuctionItems.js";
import express from "express";
import cors from "cors";
import { addAuctionItem, findAuctionItem, updateAuctionItem, deleteAuctionItem } from "./controller.js";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/auction");
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", (req, res) => {
  const item = req.body;
  addAuctionItem(item)
    .then((item) => {
      console.log("Item added:", item);
      res.status(201).json(item);
    })
    .catch((err) => {
      console.error("Error adding item:", err);
      res.status(500).json({ error: "Error adding item" });
    });
});

app.get("/search", (req, res) => {
  const keywords = req.query.keywords;
  findAuctionItem(keywords)
    .then((items) => {
      console.log("Items found:", items);
      res.status(200).json(items);
    })
    .catch((err) => {
      console.error("Error finding items:", err);
      res.status(500).json({ error: "Error finding items" });
    });
});

app.put("/update/:id", (req, res) => {  
  const id = req.params.id;
  const item = req.body;
  updateAuctionItem(id, item)
    .then((item) => {
      if (!item) {
        console.log("Item not found");
        return res.status(404).json({ error: "Item not found" });
      }
      console.log("Item updated:", item);
      res.status(200).json(item);
    })
    .catch((err) => {
      console.error("Error updating item:", err);
      res.status(500).json({ error: "Error updating item" });
    }); 
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  deleteAuctionItem(id)
    .then((item) => {
      if (!item) {
        console.log("Item not found");
        return res.status(404).json({ error: "Item not found" });
      }
      console.log("Item deleted:", item);
      res.status(200).json(item);
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      res.status(500).json({ error: "Error deleting item" });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Disconnect from MongoDB
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('MongoDB disconnection error:', err);
    throw err;
  }
};
