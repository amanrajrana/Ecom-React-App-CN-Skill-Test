import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchProducts, productSelector } from "../redux/productReducer";
import { useSelector, useDispatch } from "react-redux";
import ItemCard from "../components/itemCard";
import Filter from "../components/filter";

export default function Product() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(productSelector);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      console.log("fetching products");
      dispatch(fetchProducts());
    }
  }, []);

  // TOdO Task  (Add error , if no internet connection , inform users, api failed to fetch data)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-slate-300 p-10 flex flex-col">
          <Filter sort={sort} setSort={setSort} />
          <ItemCard products={products} sort={sort} />
        </div>
      )}
    </>
  );
}
