// orderModel.js
class Order {
    constructor(order_id, user_id, total, status, order_date, email, phone, address, note, paymentMethod ) {

        this.order_id = order_id;
        this.user_id = user_id;
        this.total = total;
        this.status = status;
        this.order_date = order_date;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.note = note;
        this.paymentMethod = paymentMethod;
        
      
        
    }
}
export default Order;