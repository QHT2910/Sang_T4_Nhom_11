
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthed, setIsAuthed] = useState(false);
    const [role, setRole] = useState("user");
    const [initial, setInitial] = useState("U");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAuthed(Boolean(localStorage.getItem("token")));
        const storedRole = localStorage.getItem("role") || "user";
        setRole(storedRole);
        const userRaw = localStorage.getItem("user");
        try {
            const user = userRaw ? JSON.parse(userRaw) : null;
            const name = user?.username || "U";
            setInitial(String(name).charAt(0).toUpperCase());
            const adminRole =
                storedRole === "superadmin" ||
                storedRole === "admin" ||
                user?.is_superuser === true ||
                user?.is_staff === true;
            setIsAdmin(adminRole);
        } catch {
            setInitial("U");
            setIsAdmin(storedRole === "superadmin" || storedRole === "admin");
        }
    }, [location.pathname]);

    return (
        <header className="header">
            <h1 className="text-2xl font-bold p-4">My App</h1>
            <nav className="nav">
                <a href="/" className="nav-link">Home</a>
                {!isAuthed && <a href="/login" className="nav-link">Login</a>}
                {!isAuthed && <a href="/register" className="nav-link">Register</a>}
                <a href="/about" className="nav-link">About</a>
                <a href="/contact" className="nav-link">Contact</a>
                {isAuthed && (
                    <div className="user-menu">
                        <button className="user-icon" type="button" aria-label="User menu">
                            <span className="user-avatar">{initial}</span>
                        </button>
                        <div className="user-dropdown">
                            <a href="/user" className="nav-link">
                                My Profile
                            </a>
                            {isAdmin && (
                                <a href="/admin" className="nav-link">
                                    Admin Panel
                                </a>
                            )}
                            <button
                                className="user-logout"
                                type="button"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("role");
                                    localStorage.removeItem("user");
                                    setIsAuthed(false);
                                    navigate("/login");
                                }}
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
