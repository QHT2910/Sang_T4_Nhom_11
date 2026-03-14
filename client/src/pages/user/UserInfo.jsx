function UserInfo() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const user = localStorage.getItem("user");
  const parsed = user ? JSON.parse(user) : null;

  return (
    <div className="user-info">
      <h2>User Information</h2>
      <p>This is your profile page.</p>
      <div className="user-card">
        <p>
          Username:{" "}
          <strong>{parsed?.username || "Unknown"}</strong>
        </p>
        <p>
          Email: <strong>{parsed?.email || "Unknown"}</strong>
        </p>
        <p>
          Role: <strong>{role || "user"}</strong>
        </p>
        <p>
          Token: <span className="user-token">{token ? "Available" : "None"}</span>
        </p>
      </div>
    </div>
  );
}

export default UserInfo;
