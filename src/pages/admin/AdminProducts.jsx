import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/admin/ProductForm';
import CategoryForm from '../../components/admin/CategoryForm'; // Import CategoryForm
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categories, setCategories] = useState([]); // State for categories
  const [showCategoryModal, setShowCategoryModal] = useState(false); // State for category modal
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('https://encome.onrender.com/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch('https://encome.onrender.com/api/categories');
    const data = await response.json();
    setCategories(data);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (_id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${_id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const handleSaveProduct = async (productData) => {
    if (productData._id) {
      await fetch(`https://encome.onrender.com/api/products/${productData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    } else {
      await fetch('https://encome.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    }
    fetchProducts();
    setShowProductModal(false);
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false);
  };

  // Category Management Handlers
  const handleAddCategory = () => {
    setSelectedCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (_id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await fetch(`/api/categories/${_id}`, { method: 'DELETE' });
      fetchCategories();
    }
  };

  const handleSaveCategory = async (categoryData) => {
    if (categoryData._id) {
      await fetch(`https://encome.onrender.com/api/categories/${categoryData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
    } else {
      await fetch('https://encome.onrender.com/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
    }
    fetchCategories();
    setShowCategoryModal(false);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  return (
    <div className="container admin-products-container">
      {showProductModal && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={handleCloseProductModal}
        />
      )}

      {showCategoryModal && (
        <CategoryForm
          category={selectedCategory}
          onSave={handleSaveCategory}
          onCancel={handleCloseCategoryModal}
        />
      )}

      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Manage Products</h1>
          <button onClick={handleAddProduct} className="btn btn-primary-custom">Add Product</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)} className="btn btn-sm btn-outline-primary"><FaEdit /></button>
                  <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-sm btn-outline-danger ms-2"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Manage Categories</h1>
          <button onClick={handleAddCategory} className="btn btn-primary-custom">Add Category</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>
                  <button onClick={() => handleEditCategory(category)} className="btn btn-sm btn-outline-primary"><FaEdit /></button>
                  <button onClick={() => handleDeleteCategory(category._id)} className="btn btn-sm btn-outline-danger ms-2"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
