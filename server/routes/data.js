import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const dataPath = path.resolve(process.cwd(), './src/data');
const productsFilePath = path.join(dataPath, 'products.json');
const categoriesFilePath = path.join(dataPath, 'categories.json');

// Helper function to read data from JSON file
const readData = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Products API
router.get('/products', (req, res) => {
  const products = readData(productsFilePath);
  res.json(products);
});

router.post('/products', (req, res) => {
  const products = readData(productsFilePath);
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(productsFilePath, products);
  res.status(201).json(newProduct);
});

router.put('/products/:id', (req, res) => {
  const products = readData(productsFilePath);
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    writeData(productsFilePath, products);
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/products/:id', (req, res) => {
  const products = readData(productsFilePath);
  const filteredProducts = products.filter((p) => p.id !== parseInt(req.params.id));
  if (products.length !== filteredProducts.length) {
    writeData(productsFilePath, filteredProducts);
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Categories API
router.get('/categories', (req, res) => {
  const categories = readData(categoriesFilePath);
  res.json(categories);
});

router.post('/categories', (req, res) => {
  const categories = readData(categoriesFilePath);
  const newCategory = { id: Date.now(), ...req.body };
  categories.push(newCategory);
  writeData(categoriesFilePath, categories);
  res.status(201).json(newCategory);
});

router.put('/categories/:id', (req, res) => {
  const categories = readData(categoriesFilePath);
  const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    categories[index] = { ...categories[index], ...req.body };
    writeData(categoriesFilePath, categories);
    res.json(categories[index]);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

router.delete('/categories/:id', (req, res) => {
  const categories = readData(categoriesFilePath);
  const filteredCategories = categories.filter((c) => c.id !== parseInt(req.params.id));
  if (categories.length !== filteredCategories.length) {
    writeData(categoriesFilePath, filteredCategories);
    res.json({ message: 'Category deleted successfully' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

export default router;