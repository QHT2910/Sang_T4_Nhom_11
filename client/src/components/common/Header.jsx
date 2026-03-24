import { useNavigate, Link } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") || "user";

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch(err) {
        console.error("Failed to parse user data from localStorage", err);
    }

    const isAuthed = Boolean(token);

    const isAdmin =
        storedRole === "admin" ||
        storedRole === "superadmin" ||
        user?.is_superuser ||
        user?.is_staff;

    const initial = (user?.username || "U")[0].toUpperCase();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <header className="header">
          
          {!isAuthed && (
            <Link to="/" className="logo">
                MyApp
            </Link>
          )}
           <nav className="nav">
    <Link to="/" className="nav-link">Home</Link>

    {!isAuthed && (
        <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
        </>
    )}

    <Link to="/about" className="nav-link">About</Link>
    <Link to="/contact" className="nav-link">Contact</Link>

   
   

    {isAuthed && (
        <div className="user-menu">
            <button
                className="user-icon"
                onClick={() => navigate(isAdmin ? "/admin" : "/user")}
            >
                <span className="user-avatar">{initial}</span>
            </button>
            
            <div className="user-dropdown">
                {!isAdmin && (
                    <Link to="/user" className="nav-link">
                        My Profile
                    </Link>
                )}

                {isAdmin && (
                    <Link to="/admin" className="nav-link">
                        Admin Dashboard
                    </Link>
                )}

                <button
                    className="user-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )}
</nav>
            
        </header>
    );
}

export default Header;