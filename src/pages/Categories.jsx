import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);
    return (
        <div className="container ">
            <div className="row">
                {
                    categories.map((category) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={category._id}>
                                <CategoryCard item={category} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}