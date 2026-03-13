class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;

    this.created_at = user.created_at;
    this.last_login = user.last_login;

    this.is_staff = user.is_staff;
    this.is_superuser = user.is_superuser;
    this.is_active = user.is_active;

    this.groups = user.groups;
    this.user_permissions = user.user_permissions;

    
    this.role = this.getRole();
  }

  getRole() {
    if (this.is_superuser) return "superadmin";
    if (this.is_staff) return "admin";
    return "user";
  }
}

export default User;