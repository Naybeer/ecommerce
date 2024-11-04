import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200 text-gray-700";
      case "Processing":
        return "bg-blue-200 text-blue-700";
      case "Completed":
        return "bg-green-200 text-green-700";
      case "Cancelled":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">ประวัติการสั่งซื้อ</h1>
      <div className="space-y-6">
        {orders?.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-md shadow-md border">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{dateFormat(item.updatedAt)}</p>
              </div>
              <div>
                <span
                  className={`${getStatusColor(
                    item.orderStatus
                  )} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {item.orderStatus}
                </span>
              </div>
            </div>

            {/* Products Table */}
            <div>
              <table className="w-full border-collapse border border-gray-300 text-left text-gray-800">
                <thead>
                  <tr className="bg-pink-500 border-b border-gray-300">
                    <th className="px-4 py-2 border border-gray-300 text-left">
                      สินค้า
                    </th>
                    <th className="px-4 py-2 border  border-gray-300 text-center">
                      ราคา
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-center">
                      จำนวน
                    </th>
                    <th className="px-4 py-2 border border-gray-300 text-">
                      รวม
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.products?.map((product, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="px-4 py-2 border border-gray-300">
                        {product.product.title}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {numberFormat(product.product.price)}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {product.count}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        {numberFormat(product.count * product.product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Total */}
            <div className="text-right mt-4">
              <p className="text-gray-600">ราคาสุทธิ</p>
              <p className="text-xl font-bold">
                {numberFormat(item.cartTotal)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCard;
