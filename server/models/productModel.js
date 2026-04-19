class Product {
  
  constructor(product) {
    this.id = product.product_id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.image = product.image;
    this.image_url = product.image_url;
    this.brand = product.brand;
    this.sold = product.sold;
    this.tag = product.tag;
  }
}

export default Product;
