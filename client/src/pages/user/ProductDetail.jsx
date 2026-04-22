import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import productApi from "../../services/productServices"; 

export function ProductDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productApi.getProductById(id);
        const data = res.data;
        
        setProduct(data);
        setMainImage(data.image || "https://via.placeholder.com/400"); 
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải chi tiết sản phẩm:", error);
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const saveToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id || product.product_id, 
      name: product.name,
      price: product.price,
      image: mainImage,
      quantity: quantity,
      category_name: product.category_name
    };
    
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex(item => item.id === cartItem.id);

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    window.dispatchEvent(new Event("cartChange"));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    saveToCart();
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    saveToCart();
    navigate("/pay"); 
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600 mr-3"></div>
        Đang tải dữ liệu sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại!</h2>
        <Link to="/product" className="text-blue-600 underline">Quay lại danh sách sản phẩm</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] pb-12 pt-6 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to="/product" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product?.name}</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4">
              <img 
                src={mainImage} 
                alt={product?.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105" 
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">{product?.name}</h1>
            
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
              <span className={`text-sm font-bold ${product?.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                <i className={`fa-solid ${product?.stock > 0 ? "fa-check-circle" : "fa-xmark-circle"} mr-1`}></i>
                {product?.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng"}
              </span>
            </div>

            <div className="mb-6 flex items-end gap-4">
              <span className="text-4xl font-extrabold text-red-600">
                {Number(product?.price || 0).toLocaleString()} ₫
              </span>
            </div>

            <div className="text-gray-600 mb-6 italic min-h-[60px]">
               {product?.description || "Chưa có mô tả chi tiết cho sản phẩm này."}
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mt-2">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase mb-2">Số lượng</span>
                  <div className="flex items-center w-28 h-12 border border-gray-300 rounded-lg overflow-hidden">
                    <button 
                      type="button" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                      className="w-10 h-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 font-bold"
                    > - </button>
                    <input 
                      type="text" 
                      value={quantity} 
                      readOnly 
                      className="w-full h-full text-center font-bold text-gray-800 outline-none" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setQuantity(quantity + 1)} 
                      className="w-10 h-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 font-bold"
                    > + </button>
                  </div>
                </div>

                <div className="flex gap-2 w-full flex-1">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product?.stock || product.stock === 0}
                    className="flex-1 h-12 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors disabled:border-gray-400 disabled:text-gray-400 flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-cart-plus"></i> THÊM VÀO GIỎ
                  </button>
                  
                  <button 
                    onClick={handleBuyNow} 
                    disabled={!product?.stock || product.stock === 0}
                    className="flex-1 h-12 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-100 disabled:bg-gray-400 disabled:shadow-none"
                  >
                    MUA NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;