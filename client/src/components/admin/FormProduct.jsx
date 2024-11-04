import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      setForm(initialState);
      getProduct();
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getProduct();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">เพิ่มข้อมูลสินค้า</h1>
        <div className="space-y-2">
          <input
            className="w-full border border-gray-300 rounded-md p-2"
            value={form.title}
            onChange={handleOnChange}
            placeholder="ชื่อสินค้า"
            name="title"
          />
          <textarea
            className="w-full border border-gray-300 rounded-md p-2"
            value={form.description}
            onChange={handleOnChange}
            placeholder="รายละเอียด"
            name="description"
          />
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            value={form.price}
            onChange={handleOnChange}
            placeholder="ราคา"
            name="price"
          />
          <input
            type="number"
            className="w-full border border-gray-300 rounded-md p-2"
            value={form.quantity}
            onChange={handleOnChange}
            placeholder="จำนวน"
            name="quantity"
          />
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              เลือกหมวดหมู่สินค้า
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <Uploadfile form={form} setForm={setForm} />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          เพิ่มสินค้า
        </button>
      </form>

      <hr className="my-6" />

      <table className="w-full border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">รูปภาพ</th>
            <th className="border border-gray-300 p-2">ชื่อสินค้า</th>
            <th className="border border-gray-300 p-2">รายละเอียด</th>
            <th className="border border-gray-300 p-2 text-center">ราคา</th>
            <th className="border border-gray-300 p-2 text-center">จำนวน</th>
            <th className="border border-gray-300 p-2 text-center">ขายได้</th>
            <th className="border border-gray-300 p-2 text-center">อัปเดต</th>
            <th className="border border-gray-300 p-2 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {item.images.length > 0 ? (
                  <img
                    className="w-24 h-24 rounded-lg shadow-md object-cover"
                    src={item.images[0].url}
                    alt="product"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                    No Image
                  </div>
                )}
              </td>
              <td className="border border-gray-300 p-2">{item.title}</td>
              <td className="border border-gray-300 p-2">{item.description}</td>
              <td className="border border-gray-300 p-2 text-center">
                {numberFormat(item.price)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                
                {item.quantity}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                
                {item.sold}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {dateFormat(item.updatedAt)}
              </td>
              <td className="border border-gray-300 p-2 text-center flex justify-center gap-2">
                <Link
                  to={`/admin/product/${item.id}`}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormProduct;
