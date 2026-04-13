import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import productApi from "../../services/productServices";

export function ProductDetail() {
  const { id } = useParams(); // Lấy ID sản phẩm từ thanh địa chỉ

  // --- CÁC BIẾN LƯU TRỮ TRẠNG THÁI (STATE) ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedConfig, setSelectedConfig] = useState(""); // Thay cho Size
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // --- MOCK DATA (Dữ liệu giả lập chuẩn PC/Laptop) ---
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Sau này có Backend, bạn thay bằng: const res = await productApi.getProductById(id);
        setTimeout(() => {
          const mockData = {
            id: id || "LT01",
            name: "Laptop Gaming ASUS ROG Strix G15 (2024)",
            price: 25990000,
            oldPrice: 28990000,
            stock: 12,
            rating: 4.8,
            total_reviews: 156,
            description:
              "Laptop Gaming quốc dân với hệ thống tản nhiệt kép vượt trội, card đồ họa RTX 4050 mạnh mẽ giúp bạn chiến mượt mọi tựa game AAA. Màn hình 144Hz siêu mượt mang lại lợi thế cạnh tranh tuyệt đối trong các tựa game eSports.",
            images: [
              "https://via.placeholder.com/800x600/1e3a8a/ffffff?text=ASUS+ROG+Front",
              "https://via.placeholder.com/800x600/dc2626/ffffff?text=ASUS+ROG+Side",
              "https://via.placeholder.com/800x600/16a34a/ffffff?text=ASUS+ROG+Back",
              "https://via.placeholder.com/800x600/ca8a04/ffffff?text=ASUS+ROG+Keyboard",
            ],
            // Thay đổi Size thành Config (Cấu hình)
            configs: [
              "Core i5 - 8GB RAM - 512GB SSD",
              "Core i7 - 16GB RAM - 512GB SSD",
              "Core i7 - 16GB RAM - 1TB SSD",
            ],
            colors: ["Đen (Eclipse Gray)", "Xám bạc (Volt Green)"],
          };
          setProduct(mockData);
          setMainImage(mockData.images[0]);
          setSelectedColor(mockData.colors[0]); // Chọn sẵn màu đầu tiên
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Lỗi tải chi tiết:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // --- HÀM XỬ LÝ ---
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedConfig && product?.configs?.length > 0) {
      alert("Vui lòng chọn phiên bản cấu hình!");
      return;
    }
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      config: selectedConfig,
      color: selectedColor,
      image: mainImage,
    };
    console.log("Đã thêm vào giỏ:", cartItem);
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng thành công!`);
  };

  // --- GIAO DIỆN KHI ĐANG TẢI ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500">
        Đang tải dữ liệu sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-600">
        Sản phẩm không tồn tại!
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] pb-12 pt-6 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* === BREADCRUMB (Điều hướng) === */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <Link
            to="/products"
            className="hover:text-blue-600 transition-colors"
          >
            Laptop Gaming
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* === KHỐI CHI TIẾT TRÊN CÙNG === */}
        <div className="bg-white rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 border border-gray-100">
          {/* CỘT TRÁI: Gallery Hình ảnh */}
          <div className="flex flex-col gap-4">
            {/* Khung ảnh chính (Tỷ lệ 4:3 hợp với Laptop) */}
            <div className="w-full aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4">
              <img
                src={mainImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* Danh sách ảnh nhỏ */}
            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 shrink-0 border-2 rounded-md overflow-hidden cursor-pointer p-1 bg-white ${mainImage === img ? "border-blue-600" : "border-gray-200 hover:border-blue-400"}`}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-contain rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI: Thông tin và Form đặt hàng */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
              {product.name}
            </h1>

            {/* Đánh giá & Kho hàng */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
              <div className="flex items-center text-yellow-500 text-sm">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
                <span className="text-gray-500 ml-2 font-medium">
                  ({product.total_reviews} đánh giá)
                </span>
              </div>
              <div className="w-[1px] h-4 bg-gray-300"></div>
              <div className="text-sm">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-bold">
                    <i className="fa-solid fa-check-circle mr-1"></i>Còn hàng (
                    {product.stock})
                  </span>
                ) : (
                  <span className="text-red-600 font-bold">
                    <i className="fa-solid fa-circle-xmark mr-1"></i>Hết hàng
                  </span>
                )}
              </div>
            </div>

            {/* Giá tiền */}
            <div className="mb-6 flex items-end gap-4">
              <span className="text-4xl font-extrabold text-red-600">
                {Number(product.price).toLocaleString()} ₫
              </span>
              {product.oldPrice && (
                <span className="text-lg text-gray-500 line-through mb-1">
                  {Number(product.oldPrice).toLocaleString()} ₫
                </span>
              )}
            </div>

            {/* FORM CHỌN BIẾN THỂ */}
            <form onSubmit={handleAddToCart} className="flex flex-col gap-6">
              {/* Chọn Phiên bản Cấu hình (Thay thế Size) */}
              {product.configs && (
                <div>
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                      Phiên bản cấu hình:
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {product.configs.map((config, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedConfig(config)}
                        className={`w-full text-left px-5 py-3 border rounded-lg text-sm font-medium transition-all ${selectedConfig === config ? "border-blue-600 text-blue-700 bg-blue-50 ring-1 ring-blue-600" : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"}`}
                      >
                        {config}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chọn Màu sắc */}
              {product.colors && (
                <div>
                  <span className="block text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2">
                    Màu sắc:{" "}
                    <span className="text-blue-600 ml-1">
                      {selectedColor || "Chưa chọn"}
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedColor === color ? "border-blue-600 text-blue-700 bg-blue-50" : "border-gray-300 text-gray-700 hover:border-gray-400"}`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Khu vực Mua hàng */}
              <div className="flex items-end gap-4 mt-2">
                {/* Số lượng */}
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                    Số lượng
                  </span>
                  <div className="flex items-center w-28 h-12 border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 font-bold"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-full h-full text-center font-bold text-gray-800 border-x border-gray-300 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full bg-gray-50 flex items-center justify-center hover:bg-gray-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Nút Đặt hàng */}
                <button
                  type="submit"
                  disabled={product.stock === 0}
                  className="flex-1 h-12 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-cart-plus"></i> THÊM VÀO GIỎ
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* === KHỐI MÔ TẢ & ĐÁNH GIÁ CHI TIẾT === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái: Bài viết mô tả */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit">
            <h2 className="text-xl font-bold uppercase text-gray-800 mb-4 border-b-2 border-gray-100 pb-2 inline-block">
              Đặc điểm nổi bật
            </h2>
            <div className="text-gray-700 leading-relaxed text-base space-y-4">
              <p>{product.description}</p>
              <p>
                Trang bị hệ thống cổng kết nối đa dạng bao gồm USB Type-C hỗ trợ
                DisplayPort, HDMI 2.1 và cổng mạng LAN RJ45, đảm bảo đường
                truyền ổn định nhất cho game thủ.
              </p>
            </div>
          </div>

          {/* Cột phải: Đánh giá */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit">
            <h2 className="text-xl font-bold uppercase text-gray-800 mb-4 border-b-2 border-gray-100 pb-2">
              Đánh giá khách hàng
            </h2>

            <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="text-5xl font-extrabold text-yellow-500">
                {product.rating}
              </div>
              <div>
                <div className="text-yellow-400 text-base mb-1">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <div className="text-sm text-gray-500">
                  {product.total_reviews} bài đánh giá
                </div>
              </div>
            </div>

            <button className="w-full border-2 border-blue-600 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all mb-6">
              GỬI ĐÁNH GIÁ CỦA BẠN
            </button>

            {/* Danh sách Comment */}
            <div className="flex flex-col gap-5">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800">Thái Bảo</span>
                  <span className="text-xs text-gray-400">Hôm qua</span>
                </div>
                <div className="text-yellow-400 text-xs mb-2">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-sm text-gray-600">
                  Máy build chắc chắn, tản nhiệt tốt. Chơi CS:GO fps toàn trên
                  200 rất mượt!
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-800">Tuấn Kiệt</span>
                  <span className="text-xs text-gray-400">12/04/2026</span>
                </div>
                <div className="text-yellow-400 text-xs mb-2">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <p className="text-sm text-gray-600">
                  Giao hàng cực kỳ nhanh, đóng gói cẩn thận. Tuy nhiên quạt tản
                  nhiệt hú hơi to khi chơi game nặng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
