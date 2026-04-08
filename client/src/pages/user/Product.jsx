import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import productApi from '../../services/productServices';


export function Product(){
const [products, setProducts] = useState([]);



 useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await productApi.getProducts();
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Không tải được sản phẩm", err);
      } 
    };
    loadProducts();
  }, []);


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Danh sách sản phẩm</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                            <span className="text-lg font-bold text-orange-500 mr-2">Giá: {product.price.toLocaleString()} VND</span>
                        </div>
                        <Link to={`/products/${product.id}`} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
                            Xem chi tiết
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Product;