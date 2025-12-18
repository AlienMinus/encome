import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/admin/ProductForm';
import CategoryForm from '../../components/admin/CategoryForm';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
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

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const handleSaveProduct = async (productData) => {
    if (productData.id) {
      await fetch(`/api/products/${productData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
    }
    fetchProducts();
    setShowProductModal(false);
  };

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setShowCategoryModal(true);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      fetchCategories();
    }
  };

  const handleSaveCategory = async (categoryData) => {
    if (categoryData.id) {
      await fetch(`/api/categories/${categoryData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
    } else {
      await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });
    }
    fetchCategories();
    setShowCategoryModal(false);
  };


  const handleCloseModal = () => {
    setShowProductModal(false);
    setShowCategoryModal(false);
  };

  return (
    <div className="container admin-products-container">
      {showProductModal && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={handleCloseModal}
        />
      )}
      {showCategoryModal && (
        <CategoryForm
          category={selectedCategory}
          onSave={handleSaveCategory}
          onCancel={handleCloseModal}
        />
      )}

      <div className="d-flex justify-content-between align-items-center">
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
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleEditProduct(product)} className="btn btn-sm btn-outline-primary">Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-sm btn-outline-danger ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-5">
        <h2>Manage Categories</h2>
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
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleEditCategory(category)} className="btn btn-sm btn-outline-primary">Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-sm btn-outline-danger ms-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
