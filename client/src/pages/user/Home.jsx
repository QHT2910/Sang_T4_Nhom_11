import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import productApi from "../../services/productServices.js";
import bannerDoc from "../../assets/images/banerdoc.png";
import bannerLon from "../../assets/images/banner_msi.1.png";
import banneright from "../../assets/images/banermini1.png";
import banneright2 from "../../assets/images/banermini2.png";
import baner1 from "../../assets/images/banerminh3.png";
import baner2 from "../../assets/images/banermini4.png";
import baner3 from "../../assets/images/banermini5.png";
import banerngang from "../../assets/images/banerdocdai1.png";
import banerngang2 from "../../assets/images/banerdocdai2.png";

const normalizeCategory = (value) => String(value || "").trim().toLowerCase();
const getProductId = (product) => product?.id || product?.product_id;

const ProductSection = ({ title, products, category }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link
        to={`/product?category=${encodeURIComponent(category)}`}
        className="text-sm font-semibold text-red-600 hover:text-red-700"
      >
        Xem tat ca
      </Link>
    </div>

    {products.length === 0 ? (
      <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-gray-500">
        chưa có sản phẩm {title}.
      </div>
    ) : (
      <div className="flex flex-wrap gap-4">
        {products.map((product) => {
          const productId = getProductId(product);

          return (
            <Link
              key={productId}
              to={`/product/${productId}`}
              className="border p-4 rounded min-w-[200px] w-[200px] hover:shadow-md transition-shadow bg-white flex flex-col"
            >
              <div className="w-full h-[160px] mb-3 overflow-hidden rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-[#333] text-[14px] line-clamp-2 mb-2 flex-1">
                {product.name}
              </h3>
              <p className="text-red-600 font-bold text-[16px]">
                {Number(product.price || 0).toLocaleString("vi-VN")} d
              </p>
            </Link>
          );
        })}
      </div>
    )}
  </div>
);

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
        console.error("Không tải được sản phẩm:", err);
        setError("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const laptopProducts = useMemo(
    () =>
      products.filter(
        (product) => normalizeCategory(product.category_name) === "laptop"
      ),
    [products]
  );

  const pcProducts = useMemo(
    () =>
      products.filter((product) => {
        const category = normalizeCategory(product.category_name);
        return category === "pc" || category === "may tinh";
      }),
    [products]
  );

  return (
    <main className="bg-[#f5f5f5] pb-10">
      <div className="max-w-[1200px] w-full mx-auto px-[10px] mt-[15px]">
        <div className="flex items-start gap-[15px]">
          <div className="w-[190px] shrink-0 sticky top-[90px] z-[90]">
            <Link
              to="/"
              className="block w-full overflow-hidden rounded-[10px] relative group"
            >
              <img
                src={bannerDoc}
                alt="Banner doc"
                className="w-full h-auto min-h-[400px] object-cover transition-transform duration-300 group-hover:scale-105 block"
              />
            </Link>
          </div>

          <div className="flex-1 flex flex-col gap-[30px] w-[calc(100%-205px)]">
            <div className="bg-white rounded-[10px] flex justify-between px-[5px] shadow-sm">
              <Link
                to="/product"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Tất cả sản phẩm 
              </Link>
              <Link
                to="/"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Hot Deal
              </Link>
              <Link
                to="/product?category=PC"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Pc/Máy tính
              </Link>
              <Link
                to="/product?category=Laptop"
                className="px-[10px] py-[12px] text-[13px] font-semibold text-[#333] hover:text-[#d70018] whitespace-nowrap transition-colors"
              >
                Laptop
              </Link>
            </div>

            <div className="grid grid-cols-[2.2fr_1fr] gap-[10px] h-[380px]">
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={bannerLon}
                  alt="Banner lon"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <div className="grid grid-rows-2 gap-[10px] h-full">
                <Link
                  to="/"
                  className="block w-full h-full overflow-hidden rounded-[10px] relative group"
                >
                  <img
                    src={banneright}
                    alt="Banner nho 1"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                  />
                </Link>
                <Link
                  to="/"
                  className="block w-full h-full overflow-hidden rounded-[10px] relative group"
                >
                  <img
                    src={banneright2}
                    alt="Banner nho 2"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                  />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[10px] h-[160px]">
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={baner1}
                  alt="Middle 1"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={baner2}
                  alt="Middle 2"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={baner3}
                  alt="Middle 3"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-[10px] h-[160px]">
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={banerngang}
                  alt="Bottom 1"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
              <Link
                to="/"
                className="block w-full h-full overflow-hidden rounded-[10px] relative group"
              >
                <img
                  src={banerngang2}
                  alt="Bottom 2"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto px-[10px] mt-[40px] space-y-8">
        {loading ? (
          <div className="text-center p-10 font-bold">Đang tải sản phẩm...</div>
        ) : error ? (
          <div className="text-center p-10 text-red-500">{error}</div>
        ) : (
          <>
            <ProductSection
              title="Laptop"
              products={laptopProducts}
              category="Laptop"
            />
            <ProductSection title="PC" products={pcProducts} category="PC" />
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
