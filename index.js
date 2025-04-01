import mongoose from "mongoose";
import AuctionItems from "./models/AuctionItems.js";

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

// Add Auction Item
export const addAuctionItem = (item) => {
  return AuctionItems.create(item)
    .then((item) => {
      console.log("Item added:", item);
      return item;
    })
    .catch((err) => {
      console.error("Error adding item:", err);
      throw err;
    });
};

// Find Auction Item
export const findAuctionItem = (keywords) => {
  const searchTerms = keywords.split(' ').map((word) => new RegExp(word, 'i'));
  return AuctionItems.find({ 
    $or: [{ title: { $in: searchTerms } }, { description: { $in: searchTerms } }] 
  })
    .then((items) => {
      console.log("Items found:", items);
      console.log(`${items.length} matches`);
      return items;
    })
    .catch((err) => {
      console.error("Error finding items:", err);
      throw err;
    });
};

export const updateAuctionItem = async (id, item) => {
  try {
    const updatedItem = await AuctionItems.findByIdAndUpdate(
      id,
      { 
        title: item.title,
        description: item.description,
        start_price: item.start_price,
        reserve_price: item.reserve_price
      },
      { new: true }
    );
    return updatedItem;
  } catch (error) {
    throw error;
  }
};

export const deleteAuctionItem = (id) => {
  return AuctionItems.findByIdAndDelete(id)
    .then((item) => {
      if (!item) {
        console.log("Item not found");
        return null;
      }
      console.log("Item deleted:", item);
      return item;
    }
    ).catch((err) => {
      console.error("Error deleting item:", err);
      throw err;
    }); 
};



