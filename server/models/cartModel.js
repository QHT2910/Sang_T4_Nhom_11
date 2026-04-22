class Cart{
    constructor(
        id,
        user_id,
        created_at
    ) {
        this.items = []; // Mảng chứa các sản phẩm trong giỏ hàng
        this.id = id;
        this.user_id = user_id;
        this.created_at = created_at;
    }
}