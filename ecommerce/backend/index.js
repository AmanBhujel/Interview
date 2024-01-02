const express = require("express");
const connectDB = require('./config/DBconfig');
const ProductRoute = require('./routes/productRoutes');
const cors = require('cors')
const app = express();
app.use(express.json())
connectDB();
app.use(cors());
app.use('/products', ProductRoute);

app.listen(5000, (req, res) => {
    console.log("Server is running in 5000")
});