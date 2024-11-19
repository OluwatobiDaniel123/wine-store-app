import Transaction from "../model/Product.js";
import NewArrivalProduct from "../model/NewArrivalProduct.js";
import BestSellers from "../model/BestSekllers.js";
import Product from "../model/Product.js";
import SplOfferData from "../model/SplOfferData.js";

// POST: http://localhost:8080/api/new
// export const create_Categories = async (req, res) => {
//   try {
//     const { type, color } = req.body;
//     const newCategory = new Category({ type, color });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (error) {
//     res
//       .status(400)
//       .json({ error: "Category Creation Error", details: error.message });
//   }
// };

// GET: http://localhost:8080/api/categories
// export const get_Categories = async (req, res) => {
//   try {
//     const data = await Category.find({});
//     const filter = data.map((v) => ({
//       type: v.type,
//       color: v.color,
//     }));
//     res.json(filter);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: `Error while fetching categories: ${error.message}` });
//   }
// };

// POST: http://localhost:8080/api/transaction
export const create_NewArrivalProduct = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json("NewArrivalProduct Data fail to Get");
    const { productName, price, color, badge, des } = req.body;

    const img = req.file ? `/uploads/${req.file.filename}` : null;

    const newNewArrivalProduct = new NewArrivalProduct({
      img,
      productName,
      price,
      color,
      badge,
      des,
    });

    const savedNewArrivalProduct = await newNewArrivalProduct.save();
    res.json(savedNewArrivalProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while creating transaction: ${error.message}` });
  }
};

// GET: http://localhost:8080/api/transaction
export const get_NewArrivalProduct = async (req, res) => {
  try {
    const data = await NewArrivalProduct.find({});
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching NewArrivalProducts: ${error.message}`,
    });
  }
};

export const create_BestSellers = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json("BestSellers Data fail to Get");
    const { productName, price, color, badge, des } = req.body;

    const img = req.file ? `/uploads/${req.file.filename}` : null;

    const newBestSellers = new BestSellers({
      img,
      productName,
      price,
      color,
      badge,
      des,
    });

    const savedBestSellers = await newBestSellers.save();
    res.json(savedBestSellers);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while creating transaction: ${error.message}` });
  }
};

// GET: http://localhost:8080/api/transaction
export const get_BestSellers = async (req, res) => {
  try {
    const data = await BestSellers.find({});
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching BestSellerss: ${error.message}`,
    });
  }
};

export const create_Product = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json("Product Data fail to Get");
    const { productName, price, color, badge, des } = req.body;

    const img = req.file.path;

    const newProduct = new Product({
      img,
      productName,
      price,
      color,
      badge,
      des,
    });

    const savedProduct = await newProduct.save();
    res.send({ img: `/uploads/${req.file.filename}` });
    res.json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while creating transaction: ${error.message}` });
  }
};

// GET: http://localhost:8080/api/transaction
export const get_Product = async (req, res) => {
  try {
    const data = await Product.find({});
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching Products: ${error.message}`,
    });
  }
};

export const create_SplOfferData = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json("Product Data fail to Get");
    const { productName, price, color, badge, des, cat } = req.body;

    const img = req.file.path;

    const new_SplOfferData = new SplOfferData({
      img,
      productName,
      price,
      color,
      badge,
      des,
      cat,
    });

    const saved_SplOfferData = await new_SplOfferData.save();
    res.send({ img: `/uploads/${req.file.filename}` });
    res.json(saved_SplOfferData);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while creating transaction: ${error.message}` });
  }
};

// GET: http://localhost:8080/api/transaction
export const get_SplOfferData = async (req, res) => {
  try {
    const data = await SplOfferData.find({});
    res.json(data);
    console.log(data);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching Products: ${error.message}`,
    });
  }
};

// DELETE: http://localhost:8080/api/transaction
export const delete_Transaction = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "Request body not found" });

    const result = await Transaction.deleteOne(req.body).clone();
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No transaction found to delete" });
    }
    res.json("Record Deleted!");
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while deleting transaction: ${error.message}` });
  }
};
