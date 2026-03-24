import { Outlet, useNavigate } from "react-router-dom";
function Admindefault() {
 const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        
        <div className="admin-layout">
        
            <header className="admin-header">
                <h1 className="admin-logo">Admin Panel</h1>
                <nav>
                    <button onClick={() => navigate("/admin")}>Dashboard</button>
                    <button onClick={() => navigate("/admin/users")}>Users</button>
                    <button onClick={() => navigate("/admin/products")}>Products</button>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            </header>

           
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}

export default Admindefault;