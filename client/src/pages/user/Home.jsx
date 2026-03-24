import { useEffect, useState } from "react";
import productApi from "../../services/productServices.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productApi.getProducts();
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Không tải được sản phẩm", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // LOADING
  if (loading) {
    return <div className="home">Loading...</div>;
  }

  // ERROR
  if (error) {
    return <div className="home">{error}</div>;
  }

  return (
    <div className="home">
      {products.length === 0 ? (
        <p>Không có sản phẩm</p>
      ) : (
        products.map((p) => (
          <div className="product-card" key={p.product_id}>
            <h3>{p.name}</h3>

            <p className="price">
              {Number(p.price).toLocaleString()} đ
            </p>

            <p className="desc">
              {p.description || "Không có mô tả"}
            </p>

            <p className="stock">
              {p.stock > 0 ? (
                <span>Còn hàng: {p.stock}</span>
              ) : (
                <span style={{ color: "red" }}>Hết hàng</span>
              )}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;