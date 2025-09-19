const express = require("express");
const app = express();
const PORT = 3000;

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

app.use(express.json());

// Rute
app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});