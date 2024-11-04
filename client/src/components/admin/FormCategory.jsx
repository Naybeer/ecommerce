import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify'

const FormCategory = () => {
    const token = useEcomStore((state) => state.token)
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    const [name, setName] = useState('')

    useEffect(() => {
        getCategory(token)
    }, [token])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warning('Please fill in the category name')
        }

        try {
            const res = await createCategory(token, { name })
            toast.success(`Added category: ${res.data.name}`)
            setName('')
            getCategory(token)
        } catch (err) {
            console.error(err)
            toast.error("An error occurred")
        }
    }

    const handleRemove = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return
        try {
            await removeCategory(token, id)
            toast.success("Category deleted successfully")
            getCategory(token)
        } catch (err) {
            console.error(err)
            toast.error("An error occurred")
        }
    }

    return (
        <div className='container mx-auto p-6 bg-white shadow-md rounded-lg'>
            <h1 className='text-2xl font-bold mb-4'>Category Management</h1>

            <form onSubmit={handleSubmit} className='flex gap-4 mb-6'>
                <input
                    type='text'
                    className='border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500'
                    placeholder='Enter category name...'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    type='submit'
                    className='px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium'
                >
                    Add
                </button>
            </form>

            <hr className='mb-4' />

            <ul className='space-y-4'>
                {categories.map((item, index) => (
                    <li key={index} className='flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm'>
                        <span className='text-lg font-semibold'>{item.name}</span>
                        <button
                            onClick={() => handleRemove(item.id)}
                            className='px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white font-medium'
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FormCategory
