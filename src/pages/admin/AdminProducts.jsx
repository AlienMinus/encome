import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../../components/admin/ProductForm';
import CategoryForm from '../../components/admin/CategoryForm'; // Import CategoryForm
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categories, setCategories] = useState([]); // State for categories
  const [showCategoryModal, setShowCategoryModal] = useState(false); // State for category modal
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const [filterCategory, setFilterCategory] = useState(''); // State for category filter
  const [filterStock, setFilterStock] = useState(''); // State for stock filter
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const { getToken } = useAuth(); // Get getToken from useAuth

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories on component mount
  }, [filterCategory, filterStock, searchTerm]); // Add filters to dependency array
  
  useEffect(() => {
    fetchProducts(); // Refetch products when filters change
  }, [filterCategory, filterStock, searchTerm]);

  const fetchProducts = async () => {
    try {
      let url = 'https://encome.onrender.com/api/products?';
      if (filterCategory) url += `category=${filterCategory}&`;
      if (filterStock) url += `stock=${filterStock}&`;
      if (searchTerm) url += `search=${searchTerm}&`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://encome.onrender.com/api/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
      try {
        await axios.delete(`https://encome.onrender.com/api/products/${_id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (productData._id) {
        await axios.put(`https://encome.onrender.com/api/products/${productData._id}`, productData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      } else {
        await axios.post('https://encome.onrender.com/api/products', productData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      fetchProducts();
      setShowProductModal(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
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
      try {
        await axios.delete(`https://encome.onrender.com/api/categories/${_id}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleSaveCategory = async (categoryData) => {
    try {
      if (categoryData._id) {
        await axios.put(`https://encome.onrender.com/api/categories/${categoryData._id}`, categoryData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      } else {
        await axios.post('https://encome.onrender.com/api/categories', categoryData, {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
      }
      fetchCategories();
      setShowCategoryModal(false);
    } catch (error) {
      console.error("Error saving category:", error);
    }
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
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="form-group flex-grow-1">
            <label htmlFor="searchProduct" className="form-label">Search Product</label>
            <input
              type="text"
              className="form-control"
              id="searchProduct"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="form-group flex-grow-1">
            <label htmlFor="filterCategory" className="form-label">Filter by Category</label>
            <select
              className="form-select"
              id="filterCategory"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group flex-grow-1">
            <label htmlFor="filterStock" className="form-label">Filter by Stock</label>
            <input type="number" className="form-control" id="filterStock" placeholder="Min stock" value={filterStock} onChange={(e) => setFilterStock(e.target.value)} />
          </div>
        </div>
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
