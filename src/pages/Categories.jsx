import { useState, useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://encome.onrender.com/api/categories');
                setCategories(response.data);
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