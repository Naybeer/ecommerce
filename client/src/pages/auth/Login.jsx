import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useEcomStore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';
import logo1 from "../../assets/white.jpg";
const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  console.log('user from zustand', user);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success('Welcome Back');
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/'); // Redirect to home for non-admin users
    }
  };

  return (
    <div className='relative w-full h-screen'>
      {/* Background image */}
      <div className='absolute w-full h-full overflow-hidden'>
        <img
          src={logo1}
          alt='Roasted Chicken'
          className='w-full h-full object-cover rounded-lg'
        />
      </div>

      {/* Login form */}
      <div className=' w-full h-full flex flex-col justify-center items-center'>
        <div className='border-10 p-16 rounded-md shadow-lg bg-orange-100 bg-opacity-30 backdrop-blur-md border-orenge-100'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <h1 className='text-5xl text-center font-bold mb-6 text-orange-500'>LOGIN</h1>

            <div>
              <label className='block mb-2 text-orange-500'>Email Address</label>
              <input
                className='border-2 border-gray-300 w-full p-2 rounded-md'
                onChange={handleOnChange}
                name='email'
                type='email'
              />
            </div>

            <div>
              <label className='block mb-2 text-orange-500'>Password</label>
              <input
                className='border-2 border-gray-300 w-full p-2 rounded-md'
                onChange={handleOnChange}
                name='password'
                type='password'
              />
            </div>

            <button className='bg-orange-400 text-white px-4 py-2 rounded-md'>
              Login
            </button>

            <div className='text-sm mt-2'>
              If you don't have an account,
              <button
                onClick={() => navigate('/register')}
                className='bg-green-500 text-white px-4 py-2 rounded-md ml-2'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
