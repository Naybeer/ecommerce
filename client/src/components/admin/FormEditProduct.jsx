import React, { useEffect, useState } from 'react';
import useEcomStore from '../../store/ecom-store';
import { readProduct, updateProduct } from '../../api/product';
import { toast } from 'react-toastify';
import Uploadfile from './Uploadfile';
import { useParams, useNavigate } from 'react-router-dom';

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: '',
    images: [],
  });

  useEffect(() => {
    getCategory();
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await readProduct(token, id);
      setForm(res.data);
    } catch (err) {
      console.log('Err fetching data', err);
    }
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(token, id, form);
      toast.success(`แก้ไขข้อมูล ${form.title} สำเร็จ`);
      navigate('/admin/product');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-700">แก้ไขข้อมูลสินค้า</h1>

        <input
          className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />
        <input
          type="number"
          className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
        />
        <input
          type="number"
          className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
        />
        <select
          className="border w-full p-3 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>Select Category</option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>{item.name}</option>
          ))}
        </select>

        <Uploadfile form={form} setForm={setForm} />

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition">
          แก้ไขสินค้า
        </button>
      </form>
    </div>
  );
};

export default FormEditProduct;
