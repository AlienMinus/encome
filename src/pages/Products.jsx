import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import products from "../data/products.json";

export default function Products({ search, setSearch }) {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesSearch = search
        ? product.name.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="my-4">
          {search
            ? `Search Results for "${search}"`
            : category
            ? `Products in ${category}`
            : "Our Products"}
        </h2>
        <div className="d-flex">
          <div className="form-group">
            <select
              className="form-control"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <h2 className="my-4 text-center">No products found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
