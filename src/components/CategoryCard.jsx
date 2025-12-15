import { Link } from "react-router-dom";
import Icon from "./Icon";
export default function CategoryCard({ item }) {
  return (
    <>
      <div className="card h-100">
        <div
          className="card-img-top text-center p-4 category-icon"
          style={{ fontSize: "6rem" }}
        >
          <Icon name={item.icon} />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <Link
            to={`/products?category=${encodeURIComponent(item.name)}`}
            className="btn btn-primary-custom mt-auto"
          >
            Explore
          </Link>
        </div>
      </div>
    </>
  );
}
