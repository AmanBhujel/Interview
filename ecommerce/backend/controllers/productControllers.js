const Product = require('../schema/productSchema');

// Function to get all products
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json({ products: allProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to get a product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to add a new product
const addProduct = async (req, res) => {
    try {
        const {
            id,
            name,
            stock,
            description,
            features,
            price,
            images,
            designable,
            colors,
            fabric,
        } = req.body;

        // Check if the product with the given ID already exists
        const existingProduct = await Product.findOne({ id });

        if (existingProduct) {
            return res.status(400).json({ error: 'Product with the given ID already exists.' });
        }

        // Create a new product using the Product schema
        const newProduct = new Product({
            id,
            name,
            stock,
            description,
            features,
            price,
            images,
            designable,
            colors,
            fabric,
        });

        // Save the new product to the database
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully.', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllProducts, getProductById, addProduct };
