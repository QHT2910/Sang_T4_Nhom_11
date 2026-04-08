import { Link } from "react-router-dom";

export function ProductDetail() {
    return (
        <div className="container mx-auto p-4">
            
            <button className="text-3xl font-bold mb-4">
                Chi tiết sản phẩm
                </button>
           
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-2">Tên sản phẩm</h2>
                <p className="text-gray-700 mb-4">Mô tả chi tiết về sản phẩm sẽ được hiển thị ở đây. Bạn có thể thêm thông tin về tính năng, chất liệu, kích thước, và bất kỳ thông tin nào khác mà bạn muốn chia sẻ với khách hàng.</p>
                <div className="flex items-center mb-4">
                    <span className="text-xl font-bold text-orange-500 mr-2">Giá: 1,000,000 VND</span>
                    <span className="text-sm text-gray-500 line-through">1,200,000 VND</span>
                </div>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    );
}
export default ProductDetail;