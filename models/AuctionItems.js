
import mongoose from "mongoose";

const auctionItemsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  start_price: {
    type: Number,
  },
  reserve_price: {
    type: Number,
  },
});


export default mongoose.model("AuctionItems", auctionItemsSchema);