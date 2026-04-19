  import { useEffect, useState, useRef } from "react";
  import productApi from "../../services/productServices";

  const emptyForm = {
    name: "",
    category_name: "",
    price: "",
    description: "",
    stock: "",
    image: "",
    image_url: "",
    brand :"",
    sold:"",
    tag:"",
  };

  function AdminProduct() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef(null);

    useEffect(() => {
      loadProducts();
    }, []);

    const loadProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await productApi.getProducts();
        // Đảm bảo dữ liệu là mảng
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Không tải được sản phẩm", err);
        setError("Không thể kết nối đến máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  
    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file }); 
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image_preview: previewUrl }));
    }
  };

    const triggerFileInput = () => {
      fileInputRef.current.click();
    };

    const resetForm = () => {
      setEditingId(null);
      setFormData(emptyForm);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset input file
      }
    };

    const startEdit = (product) => {
      setEditingId(product.id);
      setFormData({
        name: product.name || "",
        category_name: product.category_name || "",
        price: product.price || "",
        description: product.description || "",
        stock: product.stock || "",
        image: product.image || "",
        image_url: product.image_url || "",
        brand: product.brand || "",
        sold: product.sold || "",
        tag: product.tag || "",
      });
      // Cuộn lên đầu form để người dùng biết đang edit
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  
  const data = new FormData();
  data.append("name", formData.name);
  data.append("category_name", formData.category_name);
  data.append("price", parseFloat(formData.price));
  data.append("description", formData.description);
  data.append("stock", parseInt(formData.stock));
  data.append("brand", formData.brand);
  data.append("sold", parseInt(formData.sold));
  data.append("tag", formData.tag);

  // Kiểm tra: Nếu là File (ảnh mới chọn) thì gửi "image", nếu là String (ảnh cũ) thì gửi "image_url"
  if (formData.image instanceof File) {
    data.append("image", formData.image);
  } else if (typeof formData.image === "string" && formData.image !== "") {
    data.append("image_url", formData.image); 
  }

  try {
    if (editingId) {
      await productApi.updateProduct(editingId, data);
    } else {
      await productApi.createProduct(data);
    }
    resetForm();
    loadProducts();
  } catch (error) {
    console.error("Lỗi khi lưu sản phẩm:", error);
    setError("Lỗi khi lưu sản phẩm. Vui lòng kiểm tra lại dữ liệu.");
  }
};

    const handleDelete = async (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        try {
          await productApi.deleteProduct(id);
          loadProducts();
        } catch (error) {
          console.error("Lỗi khi xóa sản phẩm.", error);
          setError("Xoá thất bại.");
        }
      }
    };

    const filteredProducts = products.filter((p) =>
      p.name?.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="admin-users-page">
        <div className="admin-hero">
          <div>
            <div className="admin-kicker">Admin</div>
            <h2>Product Management</h2>
            <p>Quản lý và cập nhật kho hàng</p>
          </div>
          <div className="admin-actions">
            <input
              className="admin-input"
              placeholder="Tìm tên sản phẩm..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="admin-secondary" onClick={loadProducts}>
              Làm mới
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h3>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h3>

          <form className="admin-form" onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div className="form-left" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  className="admin-input"
                  name="name"
                  placeholder="Tên sản phẩm"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="admin-input"
                  name="price"
                  placeholder="Giá sản phẩm"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <input
                  className="admin-input"
                  name="category_name"
                  placeholder="Danh mục"
                  value={formData.category_name}
                  onChange={handleChange}
                />
                <input
                  className="admin-input"
                  name="stock"
                  placeholder="Số lượng kho"
                  value={formData.stock}
                  onChange={handleChange}
                />
                <input
                  className="admin-input"
                  name="brand"
                  placeholder="Thương hiệu"
                  value={formData.brand}
                  onChange={handleChange}
                />
                <input
                  className="admin-input"
                  name="sold"
                  placeholder="Số lượng bán"
                  value={formData.sold}
                  onChange={handleChange}
                />
                <input
                  className="admin-input"
                  name="tag"
                  placeholder="Tag"
                  value={formData.tag}
                  onChange={handleChange}
                />
                <textarea
                  className="admin-input"
                  name="description"
                  placeholder="Mô tả sản phẩm"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ height: "80px", padding: "10px" }}
                />
              </div>

              <div className="form-right">
                <label style={{ fontSize: "14px", color: "#666", marginBottom: "5px", display: "block" }}>
                  Hình ảnh (URL hoặc tải lên)
                </label>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                  <input
                    className="admin-input"
                    name="image"
                    placeholder="Dán link ảnh tại đây..."
                    value={formData.image}
                    onChange={handleChange}
                    style={{ flex: 1 }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button 
                    type="button" 
                    className="admin-secondary" 
                    onClick={triggerFileInput}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Chọn file
                  </button>
                </div>
                
                {/* Preview Ảnh */}
                <div style={{ 
                  border: "2px dashed #eee", 
                  borderRadius: "12px", 
                  height: "120px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative"
                }}>
                  {formData.image ? (
                    <>
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} 
                      />
                      <button 
                        type="button" 
                        onClick={() => setFormData({...formData, image: ""})}
                        style={{ 
                          position: "absolute", top: "5px", right: "5px", 
                          background: "rgba(255,0,0,0.7)", color: "white", 
                          border: "none", borderRadius: "50%", width: "20px", height: "20px",
                          cursor: "pointer", fontSize: "12px"
                        }}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <span style={{ color: "#ccc", fontSize: "12px" }}>Chưa có ảnh</span>
                  )}
                </div>
              </div>
            </div>

            <div className="admin-form-actions" style={{ marginTop: "20px" }}>
              <button className="login-button" type="submit" style={{ padding: "12px 30px" }}>
                {editingId ? "Lưu thay đổi" : "Tạo sản phẩm"}
              </button>
              {editingId && (
                <button type="button" className="admin-secondary" onClick={resetForm}>
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>

        {error && <p className="login-error" style={{ textAlign: "center" }}>{error}</p>}

        <div className="admin-table">
          <div className="admin-row admin-head">
            <span>ID</span>
            <span>Sản phẩm</span>
            <span>Giá</span>
            <span>Kho</span>
            <span style={{ flex: 1.5 }}>Mô tả</span>
            <span>Ảnh</span>
            <span>Thao tác</span>
          </div>

          {loading ? (
            <div className="admin-empty">Đang tải dữ liệu...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="admin-empty">Không tìm thấy sản phẩm nào.</div>
          ) : (
            filteredProducts.map((p) => (
              <div className="admin-row" key={p.id}>
                <span>{p.id}</span>
                <span style={{ fontWeight: "bold" }}>{p.name}</span>
                <span style={{ color: "#e30019" }}>{Number(p.price).toLocaleString()}đ</span>
                <span>{p.stock}</span>
                <span style={{ flex: 1.5, fontSize: "12px", color: "#666" }} className="truncate">
                  {p.description}
                </span>
                <span>
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: "45px", height: "45px", borderRadius: "6px", objectFit: "cover", border: "1px solid #eee" }} />
                  ) : (
                    <div style={{ width: "45px", height: "45px", background: "#f5f5f5", borderRadius: "6px" }}></div>
                  )}
                </span>
                <span className="admin-row-actions">
                  <button onClick={() => startEdit(p)} className="admin-link"> Sửa </button>
                  <button onClick={() => handleDelete(p.id)} className="admin-link danger"> Xóa </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  export default AdminProduct;