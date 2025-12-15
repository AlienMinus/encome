import categories from "../data/categories.json";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
    return (
        <div className="container ">
            <div className="row">
                {
                    categories.map((category) => {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={category.id}>
                                <CategoryCard item={category} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}