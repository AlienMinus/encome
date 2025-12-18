import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSave, onCancel }) => {
  const [editedCategory, setEditedCategory] = useState(category || { name: '', icon: '', description: '' });

  useEffect(() => {
    setEditedCategory(category || { name: '' });
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedCategory);
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{category ? 'Edit Category' : 'Add New Category'}</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  name="name"
                  value={editedCategory.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryIcon" className="form-label">Icon</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryIcon"
                  name="icon"
                  value={editedCategory.icon}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="categoryDescription" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="categoryDescription"
                  name="description"
                  value={editedCategory.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save Category</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;