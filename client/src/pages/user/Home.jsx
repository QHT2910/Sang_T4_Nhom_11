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
    <div>
      {Array.isArray(products) &&
        products.map((p) => (
          <div key={p.product_id}>
            <h3>{p.name}</h3>
            <p>{p.price}</p>
          </div>
        ))}
    </div>
  );
}

export default Home;