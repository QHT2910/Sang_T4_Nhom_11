import { useEffect, useState } from "react";
import { getProducts } from "../../services/productServices.js";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const loadProducts = async () => {
      const res = await getProducts();

      console.log(res);        
      console.log(res.data);  

      setProducts(res.data);   
    };

    loadProducts();

  }, []);

  return (
    <div className="home">
  {Array.isArray(products) &&
    products.map((p) => (
      <div className="product-card" key={p.product_id}>
        <h3>{p.name}</h3>

        <p className="price">{p.price} đ</p>

        <p className="desc">{p.description}</p>

        <p className="stock">
          Stock: {p.stock}
        </p>
      </div>
    ))}
</div>
  );
}

export default Home;