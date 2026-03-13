
function Header() {
    return (
        <header className="header">
            <h1 className="text-2xl font-bold p-4">My App</h1>
            <nav className="nav">
                <a href="/" className="nav-link">Home</a>
                <a href="/about" className="nav-link">About</a>
                <a href="/contact" className="nav-link">Contact</a>
            </nav>
        </header>
    );
}
export default Header;