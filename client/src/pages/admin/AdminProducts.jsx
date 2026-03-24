import { useEffect, useState } from "react";
import productApi from "../../services/productServices";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  stock: "",
};

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await productApi.getProducts();
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Không tải được sản phẩm", error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const startEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      stock: product.stock || "",
    });
  };

 
  const resetForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productApi.updateProduct(editingId, formData);
      } else {
        await productApi.createProduct(formData);
      }
      resetForm();
      loadProducts();
    } catch {
      setError("Lỗi khi lưu sản phẩm");
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await productApi.deleteProduct(id);
      loadProducts();
    } catch {
      setError("Xoá thất bại");
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
          <p>Quản lý sản phẩm</p>
        </div>

        <div className="admin-actions">
          <input
            className="admin-input"
            placeholder="Search product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="admin-secondary" onClick={loadProducts}>
            Refresh
          </button>
        </div>
      </div>

      
      <div className="admin-card">
        <h3>{editingId ? "Edit Product" : "Create Product"}</h3>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            className="admin-input"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="admin-input"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            className="admin-input"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <input
            className="admin-input"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="admin-form-actions">
            <button className="login-button">
              {editingId ? "Update" : "Create"}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {error && <p className="login-error">{error}</p>}

    
      <div className="admin-table">
        <div className="admin-row admin-head">
          <span>ID</span>
          <span>Name</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div className="admin-empty">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="admin-empty">No products</div>
        ) : (
          filteredProducts.map((p) => (
            <div className="admin-row" key={p.id}>
              <span>{p.id}</span>
              <span>{p.name}</span>
              <span>${p.price}</span>
              <span>{p.stock}</span>

              <span className="admin-row-actions">
                <button onClick={() => startEdit(p)} className="admin-link">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="admin-link danger"
                >
                  Delete
                </button>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminProduct;