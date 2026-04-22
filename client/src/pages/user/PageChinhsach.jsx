import React, { useState } from "react";
import { Link } from "react-router-dom";

export function ChinhSach() {
  const [activeTab, setActiveTab] = useState("bao-hanh");

  const ChinhSachMenu = [
    { id: "bao-hanh", label: "Chính sách bảo hành", icon: "fa-shield-halved" },
    { id: "doi-tra", label: "Chính sách đổi trả", icon: "fa-rotate-left" },
    { id: "giao-hang", label: "Chính sách vận chuyển", icon: "fa-truck-fast" },
    { id: "bao-mat", label: "Bảo mật thông tin", icon: "fa-lock" },
  ];

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* === BREADCRUMB === */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Chính sách & Hỗ trợ</span>
        </div>

        {/* === TIÊU ĐỀ TRANG === */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 uppercase">
            Chính sách khách hàng
          </h1>
          <p className="text-gray-500 mt-2">
            Đảm bảo quyền lợi tối đa cho khách hàng khi mua sắm các thiết bị
            công nghệ.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* === CỘT TRÁI: MENU TAB === */}
          <aside className="w-full md:w-1/4 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-bold text-gray-800 uppercase tracking-wider text-sm">
                  Danh mục hỗ trợ
                </h3>
              </div>
              <ul className="flex flex-col">
                {ChinhSachMenu.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-5 py-4 text-left font-medium transition-all duration-200 border-l-4 ${
                        activeTab === item.id
                          ? "border-blue-600 text-blue-600 bg-blue-50/50"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    >
                      <i
                        className={`fa-solid ${item.icon} w-5 text-center`}
                      ></i>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="w-full md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]">
              {activeTab === "bao-hanh" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                    Chính sách bảo hành PC & Laptop
                  </h2>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-2">
                        1. Điều kiện được bảo hành
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Thiết bị, linh kiện còn trong thời hạn bảo hành (Thời
                          hạn từ 12 - 36 tháng tùy theo quy định của hãng).
                        </li>
                        <li>
                          Tem bảo hành, mã vạch, Serial Number trên sản phẩm
                          phải còn nguyên vẹn, không có dấu hiệu cạo sửa, chắp
                          vá hay rách nát.
                        </li>
                        <li>
                          Sản phẩm phát sinh lỗi kỹ thuật do nhà sản xuất trong
                          quá trình sử dụng bình thường.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-red-600 mb-2">
                        2. Các trường hợp từ chối bảo hành
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Sản phẩm bị hư hỏng do tác động vật lý (rơi vỡ, móp
                          méo, trầy xước, đứt dây...).
                        </li>
                        <li>
                          Sản phẩm bị vào nước, chập cháy do sử dụng sai nguồn
                          điện hoặc do thiên tai, hỏa hoạn, côn trùng xâm nhập.
                        </li>
                        <li>
                          Tự ý tháo dỡ, can thiệp phần cứng hoặc mang đi sửa
                          chữa tại các cơ sở không được ủy quyền.
                        </li>
                        <li>
                          Các lỗi phần mềm, Windows, virus hoặc mất mát dữ liệu
                          trong quá trình sử dụng.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "doi-tra" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                    Chính sách đổi trả (1 đổi 1)
                  </h2>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>
                      Nhằm đảm bảo quyền lợi và sự an tâm tuyệt đối, chúng tôi
                      áp dụng chính sách <strong>Lỗi là đổi mới</strong> trong
                      thời gian đầu sử dụng.
                    </p>

                    <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-2">
                        1. Đối với Laptop & PC Build sẵn
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Trong 15 ngày đầu:</strong> 1 đổi 1 sản phẩm
                          mới hoàn toàn nếu phát sinh lỗi phần cứng từ nhà sản
                          xuất (Màn hình điểm chết, lỗi Mainboard, VGA...).
                        </li>
                        <li>
                          Yêu cầu: Máy không bị trầy xước, giữ nguyên vỏ hộp,
                          xốp và đầy đủ phụ kiện, quà tặng kèm theo.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-2">
                        2. Đối với Linh kiện (VGA, CPU, RAM...)
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Trong 07 ngày đầu:</strong> Hỗ trợ đổi mới
                          ngay lập tức nếu linh kiện bị lỗi.
                        </li>
                        <li>
                          Sau thời gian này, sản phẩm sẽ được gửi đi bảo hành
                          theo đúng tiêu chuẩn và quy trình của Hãng (Từ 7-14
                          ngày làm việc).
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "giao-hang" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                    Chính sách vận chuyển & Lắp đặt
                  </h2>

                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-2">
                        1. Khu vực TP.HCM
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Miễn phí giao hàng:</strong> Áp dụng cho mọi
                          đơn hàng PC, Laptop, Linh kiện.
                        </li>
                        <li>
                          <strong>Giao hỏa tốc:</strong> Cam kết giao hàng và hỗ
                          trợ lắp đặt tận nhà trong vòng 2 tiếng kể từ khi chốt
                          đơn.
                        </li>
                        <li>
                          Kỹ thuật viên sẽ hỗ trợ cài đặt Windows, các phần mềm
                          cơ bản và hướng dẫn sử dụng chi tiết trực tiếp tại
                          nhà.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-blue-600 mb-2">
                        2. Các tỉnh thành khác
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Giao hàng toàn quốc thông qua các đối tác vận chuyển
                          uy tín (GHTK, Viettel Post, VNPost).
                        </li>
                        <li>
                          Thời gian nhận hàng từ 2 - 5 ngày làm việc tùy khu
                          vực.
                        </li>
                        <li>
                          <strong>Đóng gói an toàn:</strong> Mọi thùng hàng
                          PC/Laptop đều được bọc chống sốc đa lớp, đóng thùng gỗ
                          (nếu cần) và dán tem niêm phong 100% để tránh rủi ro
                          va đập.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "bao-mat" && (
                <div className="animate-fadeIn">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
                    Bảo mật thông tin khách hàng
                  </h2>

                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Việc bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu
                      của chúng tôi.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Thông tin cá nhân (Họ tên, SĐT, Địa chỉ, Email) chỉ được
                        sử dụng cho mục đích xử lý đơn hàng, giao nhận và bảo
                        hành.
                      </li>
                      <li>
                        Cam kết tuyệt đối <strong>KHÔNG</strong> mua bán, trao
                        đổi thông tin của khách hàng cho bất kỳ bên thứ ba nào
                        vì mục đích thương mại.
                      </li>
                      <li>
                        Toàn bộ thông tin thanh toán qua thẻ/ngân hàng đều được
                        mã hóa an toàn theo chuẩn quốc tế.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default ChinhSach;
