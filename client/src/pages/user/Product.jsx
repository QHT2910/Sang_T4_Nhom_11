import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productApi from "../../services/productServices";
import banerngang1 from "../../assets/images/gearvn-pc-gvn-t11-topbar.png";

const normalizeCategory = (value) => String(value || "").trim().toLowerCase();
const getProductId = (product) => product?.id || product?.product_id;
const priceBrackets = [
    { id: "all", label: "Tất cả mức giá", min: 0, max: Infinity },
    { id: "duoi-10", label: "Dưới 10 triệu", min: 0, max: 10000000 },
    { id: "10-20", label: "từ 10-20 triệu", min: 10000001, max: 20000000 },
    { id: "20-30", label: "Từ 20 - 30 triệu", min: 20000001, max: 30000000 },
    { id: "tren-30", label: "Trên 30 triệu", min: 30000001, max: Infinity },
  ];
function Product() {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [manualSelectedCategory, setManualSelectedCategory] = useState("");
  const [selectedPriceId, setSelectedPriceId] = useState("all");
  const [searchParams] = useSearchParams();

  

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productApi.getProducts();
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Khong tai duoc san pham", err);
      }
    };

    loadProducts();
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category_name).filter(Boolean))],
    [products]
  );
  const querySelectedCategory = useMemo(() => {
  const requestedCategory = searchParams.get("category");
  if (!requestedCategory || categories.length === 0) return "";

  return (
    categories.find(
      (category) =>
        normalizeCategory(category) === normalizeCategory(requestedCategory)
    ) || ""
  );
}, [categories, searchParams]); // normalizeCategory ở ngoài nên thường không cần, nhưng nếu vẫn bị gạch vàng hãy thêm vào.


  const selectedCategory = manualSelectedCategory || querySelectedCategory;

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand).filter(Boolean))],
    [products]
  );

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((currentBrand) => currentBrand !== brand)
        : [...prev, brand]
    );
  };
  
  const handleCategoryChange = (category) => {
    setManualSelectedCategory(category);
  };
  const searchQuery = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);


// 2. filteredProducts: Đảm bảo lọc search không bị "kẹt" bởi category cũ
const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    // Lọc theo tên (Search)
    const matchesSearch = searchQuery === "" || 
      (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    // Lọc theo thương hiệu
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
    // Lọc theo danh mục
    const matchesCategory =
      selectedCategory === "" || product.category_name === selectedCategory;
    
    // Lọc theo giá
    const bracket = priceBrackets.find((b) => b.id === selectedPriceId) || priceBrackets[0];
    const matchesPrice =
      Number(product.price) >= bracket.min &&
      Number(product.price) <= bracket.max;

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
  });
}, [products, searchQuery, selectedBrands, selectedCategory, selectedPriceId]);

  return (
    <div className="w-full max-w-[1200px] mx-auto mb-6 px-4 md:px-0">
      <div className="w-full bg-[#007bff] flex justify-center overflow-hidden rounded-lg mb-6">
        <img src={banerngang1} alt="Banner" className="w-full h-auto object-cover" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-sm h-fit sticky top-4">
          <div className="mb-6 border-b pb-4">
            <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">Danh mục</h3>
            <div className="flex flex-wrap md:flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="cat"
                  checked={selectedCategory === ""}
                  onChange={() => handleCategoryChange("")}
                />
                <span className="text-sm">Tất cả</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCategory === cat}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6 border-b pb-4">
            <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">Mức giá</h3>
            <div className="flex flex-col gap-2">
              {priceBrackets.map((bracket) => (
                <label key={bracket.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceId === bracket.id}
                    onChange={() => setSelectedPriceId(bracket.id)}
                  />
                  <span className="text-sm">{bracket.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm">Thương Hiệu</h3>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Sản phẩm ({filteredProducts.length})</h1>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-lg">Không có sản phẩm.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                const productId = getProductId(product);

                return (
                  <div
                    key={productId}
                    className="bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-all flex flex-col border border-gray-100"
                  >
                    <div className="w-full aspect-square mb-3">
                      <img
                        src={product.image || "placeholder.png"}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h2 className="text-xs md:text-sm font-semibold mb-2 line-clamp-2 h-10">
                      {product.name}
                    </h2>
                    <div className="mt-auto">
                      <span className="text-red-600 font-bold text-sm md:text-base">
                        {Number(product.price || 0).toLocaleString()} VND
                      </span>
                      <Link
                        to={`/product/${productId}`}
                        className="mt-2 block text-center py-1.5 border border-blue-600 text-blue-600 rounded text-xs font-medium hover:bg-blue-600 hover:text-white transition-all"
                      >
                        Chi tiết 
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Product;
