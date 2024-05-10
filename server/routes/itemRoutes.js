const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,

} = require("./../controllers/itemController");

const router = express.Router();

//routes
//Method - get
router.get("/get-item", getItemController);

//MEthod - POST
router.post("/add-item", addItemController);

//method - Post
router.post("/edit-item", editItemController);

//method -delete
router.delete('/delete-item', deleteItemController);

module.exports = router;