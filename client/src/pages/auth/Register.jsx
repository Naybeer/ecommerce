import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate



const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password does not match!');
    }
    console.log(form);

    // Send to Backend
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      console.log(res.data);
      toast.success(res.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div className='relative w-full h-screen'>
      {/* Background image */}
      <div className='absolute inset-0 overflow-hidden'>
        <img src='https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640773.jpg&fm=jpg' 
        alt='Roasted Chicken' 
        className='w-full h-full object-cover rounded-lg' />
      </div>

      {/* Register form with relative positioning */}
      <div className='relative w-full h-full flex flex-col justify-center items-center'>
        <div className='border-10 p-16 rounded-md shadow-lg bg-orange-100 bg-opacity-30 backdrop-blur-md border-orenge-100'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <h1 className='text-3xl font-bold mb-6 text-orange-400'>REGISTER</h1>

            <div>
              <label className='block mb-2 text-orange-400'>Email</label>
              <input className='border-2 border-orenge-100 w-full p-2 rounded-md'
                onChange={handleOnChange}
                name='email'
                type='email'
                required // Optional: Add required attribute for form validation
              />
            </div>

            <div>
              <label className='block mb-2 text-orange-400'>Password</label>
              <input className='border-2 border-orange-100 w-full p-2 rounded-md'
                onChange={handleOnChange}
                name='password'
                type='password'
                required // Optional: Add required attribute for form validation
              />
            </div>

            <div>
              <label className='block mb-2 text-orange-400'>Confirm Password</label>
              <input className='border-2 border-oerange-100 w-full p-2 rounded-md'
                onChange={handleOnChange}
                name='confirmPassword'
                type='password'
                required // Optional: Add required attribute for form validation
              />
            </div>

            <button className='bg-orange-400 text-white px-4 py-2 rounded-md'>
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
