import React, { useEffect } from 'react';
import ProductCard from '../components/card/ProductCard';
import useEcomStore from '../store/ecom-store';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar for Search and Filters */}
      <div className="w-1/4 p-6 bg-white shadow-lg rounded-lg h-screen overflow-y-auto">
        
        <SearchCard />
      </div>

      {/* Product List */}
      <div className="w-1/2 p-6 h-screen overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">สินค้าทั้งหมด</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <ProductCard item={item} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">ไม่พบสินค้าตรงตามเงื่อนไขที่ค้นหา</p>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-1/4 p-6 bg-white shadow-lg rounded-lg h-screen overflow-y-auto">
       
        <CartCard />
        
      </div>
    </div>
  );
};

export default Shop;
