import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productApi from "../../services/productServices";
import banerngang1 from "../../assets/images/gearvn-pc-gvn-t11-topbar.png";


export function Product() {
  const [products, setProducts] = useState([]);

  // --- STATE CHO BỘ LỌC ---
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState("all"); // State lưu mốc giá được chọn
  const [categories, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);

  // --- ĐỊNH NGHĨA CÁC MỐC GIÁ ---
  const priceBrackets = [
    { id: "all", label: "Tất cả mức giá", min: 0, max: Infinity },
    { id: "duoi-10", label: "Dưới 10.000.000đ", min: 0, max: 10000000 },
    { id: "10-20", label: "Từ 10 - 20 triệu", min: 10000000, max: 20000000 },
    { id: "20-30", label: "Từ 20 - 30 triệu", min: 20000000, max: 30000000 },
    { id: "tren-30", label: "Trên 30.000.000đ", min: 30000000, max: Infinity },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productApi.getProducts();
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Không tải được sản phẩm", err);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(p => p.category_name).filter(Boolean))];
      setCategory(uniqueCategories);
    }
  }, [products]);

  useEffect(() =>{
    if (products.length > 0) {
    const uniqueBrands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    setBrands(uniqueBrands);
    }
  }, [products]);

  // Xử lý khi tick chọn thương hiệu
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  // --- LOGIC LỌC SẢN PHẨM ---
  const filteredProducts = products.filter((product) => {
    // Lọc thương hiệu
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    // Lọc danh mục
    const matchesCategory =
      selectedCategory === "" || product.category_name === selectedCategory;

    // Lọc mốc giá
    const currentPriceBracket = priceBrackets.find(
      (b) => b.id === selectedPriceId,
    );
    const matchesPrice =
      product.price >= currentPriceBracket.min &&
      product.price <= currentPriceBracket.max;

    return matchesBrand && matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full max-w-1200px mx-auto mb-6 rounded-lg overflow-hidden hidden md:block">
      <div className="w-full bg-[#007bff] flex justify-center overflow-hidden">
        <img
          src={banerngang1}
          alt="Banner Khuyến Mãi"
          className="w-full max-w-[1200px] h-auto object-cover block"
        />
      </div>

      {/* =========================================
          KHỐI BAO BỌC CHIA 2 CỘT (FLEX)
          ========================================= */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* --- CỘT TRÁI: SIDEBAR (Bộ lọc) --- */}
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-sm h-fit shrink-0">
          {/* Lọc Danh mục */}
          <div className="mb-6 border-b pb-4">
            <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
              Danh Mục
            </h3>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                <input
                  type="radio"
                  name="category_name"
                  onChange={() => setSelectedCategory("")}
                  checked={selectedCategory === ""}  // ← đồng bộ với state
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm">Tất Cả</span>
              </label>
                {/* Render từ database */}
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
                    <input
                      type="radio"
                      name="category_name"
                      onChange={() => setSelectedCategory(cat)}
                      checked={selectedCategory === cat}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
          </div>

          {/* Lọc Mốc Giá (MỚI) */}
          <div className="mb-6 border-b pb-4">
            <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
              Mức Giá
            </h3>
            <div className="flex flex-col gap-2">
              {priceBrackets.map((bracket) => (
                <label
                  key={bracket.id}
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <input
                    type="radio"
                    name="price"
                    value={bracket.id}
                    checked={selectedPriceId === bracket.id}
                    onChange={() => setSelectedPriceId(bracket.id)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{bracket.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Lọc Thương Hiệu */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">
              Thương Hiệu
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {brands.map(
                (brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      onChange={() => handleBrandChange(brand)}
                      checked={selectedBrands.includes(brand)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{brand}</span>
                  </label>
                ),
              )}
            </div>
          </div>
        </aside>

        {/* --- CỘT PHẢI: LƯỚI SẢN PHẨM --- */}
        {/* Đã được đưa vào trong thẻ div bao bọc flex md:flex-row để nằm ngang hàng với sidebar */}
        <main className="w-full md:w-3/4 flex-grow">
          {/* Header hiển thị số lượng */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              Danh sách sản phẩm{" "}
              <span className="text-sm font-normal text-gray-500">
                ({filteredProducts.length} sản phẩm)
              </span>
            </h1>
          </div>

          {/* Render sản phẩm */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-lg shadow-sm">
              <p className="text-gray-500">
                Không tìm thấy sản phẩm nào phù hợp với bộ lọc.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Khung ảnh */}
                  <div className="w-full aspect-square bg-gray-50 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">Chưa có ảnh</span>
                    )}
                  </div>

                  <h2 className="text-sm font-semibold mb-2 line-clamp-2 min-h-[40px] text-gray-800 hover:text-blue-600 cursor-pointer">
                    {product.name}
                  </h2>

                  <div className="mt-auto pt-2 border-t border-gray-50">
                    <span className="text-lg font-bold text-red-600 block mb-3">
                      {Number(product.price).toLocaleString()} ₫
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="block w-full text-center px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-300 text-sm font-medium"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Product;
