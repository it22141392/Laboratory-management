const itemModel = require("../models/itemModel");

// Get items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add item
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).json({ message: "Item Added Successfully", newItem });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request", error: error.message });
  }
};

// Update item
const editItemController = async (req, res) => {
  try {
    const { itemId, ...updateData } = req.body;
    if (!itemId) throw new Error("Item ID is required");

    const updatedItem = await itemModel.findByIdAndUpdate(itemId, updateData, {
      new: true, 
      runValidators: true 
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request", error: error.message });
  }
};

// Delete item
const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) throw new Error("Item ID is required");

    const deletedItem = await itemModel.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request", error: error.message });
  }
};

module.exports = { getItemController, addItemController, editItemController, deleteItemController };
