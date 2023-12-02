// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usa useNavigate en lugar de useHistory

const Register = () => {
  const navigate = useNavigate(); // Cambia a useNavigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/registro', formData);
      console.log(response.data);
      navigate('/login'); // Usa navigate en lugar de history.push
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Errores de validación:', error.response.data.errors);
        // Muestra mensajes de error al usuario según sea necesario
      } else {
        console.error('Error durante el registro:', error);
      }
    }
  };

  return (
    <div className='font-sans'>
      <div className='relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100'>
        <div className='relative sm:max-w-sm w-full'>
        <div class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
        <div class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
        <div className='relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md'>
        <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold">
                    Registrate
        </label>
        <form className='"mt-10' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' type="text" id="name" name="name" onChange={handleChange} required />
        </div>
        <div className='mt-7'>
          <label htmlFor="email">Email:</label>
          <input className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' type="email" id="email" name="email" onChange={handleChange} required />
        </div>
        <div className='mt-7'>
          <label htmlFor="password">Password:</label>
          <input className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' type="password" id="password" name="password" onChange={handleChange} required />
        </div >
        <button className='mt-7 bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105' type="submit">Register</button>
        <div className="mt-7">
                        <div className="flex justify-center items-center">
                            <label className="mr-2" >¿Ya tienes una cuenta?</label>
                            <a href="/login" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                login
                            </a>
                        </div>
                    </div>
        </form>
        </div>
      
        </div>
      
      </div>
      
    </div>
  );
};

export default Register;
