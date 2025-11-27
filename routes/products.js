const express = require("express");
const router = express.Router();
const products = require("../data/products");
const roleMiddleware = require("../middleware/roleMiddleware");
const uppercasePipe = require("../pipes/uppercasePipe");

router.get("/list", (req, res) => {
  res.json(products);
});

router.get("/details/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

router.get("/search-by-name", (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: "Name parameter is required" });
  }
  
  const searchTerm = uppercasePipe(name);
  
  const result = products.filter(p =>
    uppercasePipe(p.name).includes(searchTerm)
  );
  
  res.json(result);
});

router.get("/search", (req, res) => {
  const { name, minPrice, maxPrice } = req.query;
  let result = products;

  if (name) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (minPrice) {
    result = result.filter(p => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= parseFloat(maxPrice));
  }

  res.json(result);
});

router.put("/admin/edit/:id", roleMiddleware("Admin"), (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  res.json(product);
});

router.get("/admin/reports", roleMiddleware("Admin"), (req, res) => {
  res.json({
    totalProducts: products.length,
    avgPrice:
      products.reduce((acc, p) => acc + p.price, 0) / products.length
  });
});

module.exports = router;