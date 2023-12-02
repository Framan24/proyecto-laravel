// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const token = response.data.access_token; 
      localStorage.setItem('token', token);

      const userData = response.data.user;
      localStorage.setItem('usuario',  JSON.stringify(userData));
      console.log('Datos del usuario:', userData);
      console.log(response.data);
      // Redirige al usuario al dashboard después del inicio de sesión
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Credenciales inválidas:', error.response.data.message);
        // Muestra mensajes de error al usuario según sea necesario
      } else {
        console.error('Error durante el inicio de sesión:', error);
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
                    Inicia Sesion
        </label>
        <form className='"mt-10' onSubmit={handleSubmit}>
        <div className='mt-7'>
          <label htmlFor="email">Email:</label>
          <input className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' type="email" id="email" name="email" onChange={handleChange} required />
        </div>
        <div className='mt-7'>
          <label htmlFor="password">Password:</label>
          <input className='mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' type="password" id="password" name="password" onChange={handleChange} required />
        </div >
        <button className='mt-7 bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105' type="submit">Login</button>
        <div className="mt-7">
                        <div className="flex justify-center items-center">
                            <label className="mr-2" >¿No tienes una cuenta?</label>
                            <a href="/" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                Registrarse
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

export default Login;

