import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  SquareChartGantt,
  ShoppingBasket,
  ListOrdered,
  LogOut
} from "lucide-react";
import useEcomStore from "../../store/ecom-store"; // สมมติว่าคุณใช้ store ที่มีฟังก์ชัน logout

const SidebarAdmin = () => {
  const logout = useEcomStore((s) => s.Logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // เรียกฟังก์ชัน logout เพื่อล้างสถานะผู้ใช้
    navigate("/login"); // นำผู้ใช้ไปยังหน้าเข้าสู่ระบบหลังจาก logout
  };

  return (
    <div
      className="bg-gray-800 w-64 text-gray-100 
    flex flex-col h-screen"
    >
      <div
        className="h-24 bg-gray-900 flex items-center
      justify-center text-2xl font-bold"
      >
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to={"/admin"}
          end
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <LayoutDashboard className="mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to={"manage"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <UserCog className="mr-2" />
          Manage
        </NavLink>

        <NavLink
          to={"category"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <SquareChartGantt className="mr-2" />
          Category
        </NavLink>

        <NavLink
          to={"product"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ShoppingBasket className="mr-2" />
          Product
        </NavLink>

        <NavLink
          to={"orders"}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-900 rounded-md text-white px-4 py-2 flex items-center"
              : "text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center"
          }
        >
          <ListOrdered className="mr-2" />
          Orders
        </NavLink>
      </nav>

      <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center w-full"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;
