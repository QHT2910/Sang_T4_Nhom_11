import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import productApi from "../../services/productServices"; // 1. Import API service

export function ProductDetail() {
  const { id } = useParams(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  const [quantity, setQuantity] = useState(1);

  // 2. Gọi API lấy dữ liệu thực tế
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productApi.getProductById(id); // Gọi hàm lấy chi tiết sản phẩm
        const data = res.data;
        
        setProduct(data);
        setMainImage(data.image || ""); 
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải chi tiết sản phẩm:", error);
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: mainImage,
    };
    console.log("Đã thêm vào giỏ:", cartItem);
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500">
      Đang tải dữ liệu sản phẩm...
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-600">
      Sản phẩm không tồn tại hoặc đã bị xóa!
    </div>
  );

  return (
    <div className="bg-[#f5f5f5] pb-12 pt-6 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to="/product" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 border border-gray-100">
          {/* CỘT TRÁI: Gallery Hình ảnh */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4">
              {mainImage ? (
                <img src={mainImage} alt={product.name} className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105" />
              ) : (
                <span className="text-gray-400">Không có ảnh</span>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: Thông tin */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
              <span className="text-sm text-green-600 font-bold">
                <i className="fa-solid fa-check-circle mr-1"></i>Còn hàng ({product.stock})
              </span>
            </div>

            <div className="mb-6 flex items-end gap-4">
              <span className="text-4xl font-extrabold text-red-600">
                {Number(product.price).toLocaleString()} ₫
              </span>
            </div>

            <div className="text-gray-600 mb-6 italic">
               {product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
            </div>

            <form onSubmit={handleAddToCart} className="flex flex-col gap-6">
              <div className="flex items-end gap-4 mt-2">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase mb-2">Số lượng</span>
                  <div className="flex items-center w-28 h-12 border border-gray-300 rounded-lg overflow-hidden">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 font-bold">-</button>
                    <input type="text" value={quantity} readOnly className="w-full h-full text-center font-bold text-gray-800 outline-none" />
                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 font-bold">+</button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={product.stock === 0}
                  className="flex-1 h-12 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 shadow-md flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-cart-plus"></i> THÊM VÀO GIỎ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;