import Transaction from "../model/Product.js";
import NewArrivalProduct from "../model/NewArrivalProduct.js";
import BestSellers from "../model/BestSekllers.js";
import Product from "../model/Product.js";
import SplOfferData from "../model/SplOfferData.js";
import path from "path";
import User from "../model/User.js";

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
    if (!req.body.products || !req.files) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    console.log(req.body, req.files);

    const parsedProducts = req.body.products.map((product) =>
      JSON.parse(product)
    );
    const files = req.files;

    if (parsedProducts.length !== files.length) {
      return res
        .status(400)
        .json({ message: "Mismatched products and images" });
    }

    const savedProducts = [];
    for (let i = 0; i < parsedProducts.length; i++) {
      const { name, description, price, color, badge } = parsedProducts[i];
      const imageUrl = files[i].path;

      // const baseUrl = `${req.protocol}://${req.get("host")}`;
      // const imageUrl = `${baseUrl}/images/${path.basename(image)}`;

      // console.log(baseUrl);

      const newProduct = new Product({
        productName: name,
        des: description,
        price: Number(price),
        color,
        badge: badge === "true", // Convert to boolean
        image: imageUrl,
      });

      const savedProduct = await newProduct.save();
      savedProducts.push(savedProduct);
    }

    res.status(201).json({
      message: "Products created successfully",
      products: savedProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while creating products: ${error.message}` });
  }
};

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

export const delete_Single_Product = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Product details not provided" });
    }

    const result = await Product.deleteOne({ _id: req.body._id }).clone();

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No product found to delete" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: `Error while deleting product: ${error.message}`,
    });
  }
};

export const get_all_users = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: `Error while fetching Products: ${error.message}`,
    });
  }
};
