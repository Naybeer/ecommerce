import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // เพิ่ม import นี้
import useEcomStore from "./../store/ecom-store";
import { numberFormat } from "./../utils/number";



const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // สร้างตัวแปร navigate

  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  // Expanded menu items data
  const menuItems = [
    { id: 1, title: "ข้าวมันไก่", description: "Delicious Chicken Rice", price: 60, images: [{ url: "https://images.pexels.com/photos/6990118/pexels-photo-6990118.jpeg?auto=compress&cs=tinysrgb&w=600" }] },
    
    { id: 2, title: "ผัดไท", description: "Classic Pad Thai", price: 70, images: [{ url: "https://images.pexels.com/photos/5939141/pexels-photo-5939141.jpeg?auto=compress&cs=tinysrgb&w=400" }] },
    { id: 3, title: "แกงเขียวหวานไก่", description: "Green Curry with Chicken", price: 90, images: [{ url: "https://images.pexels.com/photos/20258248/pexels-photo-20258248.jpeg?auto=compress&cs=tinysrgb&w=400" }] },
    { id: 4, title: "ก๋วยเตี๋ยวเรือ", description: "Boat Noodles", price: 50, images: [{ url: "https://eknoodle.com/wp-content/uploads/2022/12/44-1024x749.jpg" }] },
    { id: 5, title: "ข้าวผัดกะเพรา", description: "Spicy Basil Fried Rice", price: 70, images: [{ url: "https://www.thammculture.com/wp-content/uploads/2024/01/Untitled-612.jpg" }] },
    { id: 6, title: "ขนมครก", description: "Coconut Pancakes", price: 20, images: [{ url: "https://img-global.cpcdn.com/recipes/8f14de0375f6222d/1200x630cq70/photo.jpg" }] },
    { id: 7, title: "ไข่เจียว", description: "Thai-style Omelette", price: 25, images: [{ url: "https://s359.kapook.com/pagebuilder/1c0a0dac-e4a9-4651-baa0-052a597ab7bf.jpg" }] },
  ];

  // ฟังก์ชันกรองเมนูตามคำค้นหา
  const filteredItems = menuItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50">
      {/* Banner Section */}
      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url('https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-white text-5xl font-extrabold mb-2">Welcome to EasyEat</h1>
          <p className="text-white mt-2 text-lg max-w-lg">
            Welcome to EASYEAT, your go-to spot for delicious savory dishes, mouthwatering desserts, and refreshing beverages! Our diverse menu is crafted to satisfy every craving, from authentic Thai flavors to delightful sweet treats.
          </p>
          <button 
            className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
            onClick={() => navigate('/user/history')} // เพิ่มการนำทางไปยังหน้า history
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto py-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for dishes..."
          className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // อัปเดตคำค้นหาเมื่อพิมพ์
        />
      </div>

      {/* Menu Section */}
      <div className="container mx-auto py-10">
        <h2 className="text-4xl font-bold text-center mb-8">เมนูแนะนำ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="border rounded-md shadow-md p-4 w-80"
            >
              <div>
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    className="rounded-md w-full h-48 object-cover hover:scale-110 hover:duration-200"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md text-center flex items-center justify-center shadow">
                    No Image
                  </div>
                )}
              </div>
              
              <div className="py-3">
                <p className="text-xl font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>

              
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg font-light">&copy;  สมาคมอาหารบ้านยายเหวี่ยง | อาหารอร่อยสุดในประเทศไทย</p>
          <p className="mt-2 text-sm">457, Nakhon Pathom , Thailand</p>
          <p className="text-sm">Phone: +66 281 1234 | Email: easyeat@gmail.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;



