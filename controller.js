import AuctionItems from "./models/AuctionItems.js";


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
    })
    .catch((err) => {
      console.error("Error deleting item:", err);
      throw err;
    }); 
};

export const getAllItems = () => {
  return AuctionItems.find({})
    .then((items) => {
      console.log(`Found ${items.length} items`);
      return items;
    })
    .catch((err) => {
      console.error("Error getting all items:", err);
      throw err;
    });
};