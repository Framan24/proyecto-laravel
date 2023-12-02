
// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate(); // Asegúrate de importar useNavigate
  const [userInfo, setUserInfo] = useState(null);
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
    // Recupera el token del localStorage
    const token = localStorage.getItem('token');

    const userDatastring = localStorage.getItem('usuario');
    const userdata = JSON.parse(userDatastring);
    setUserData(userdata);

    if (!token) {
      // Manejo de la situación en la que no hay token (usuario no autenticado)
      console.error('No hay token disponible. Usuario no autenticado.');
      // Redirigir al usuario a la página de inicio de sesión u otra página según tus necesidades
      navigate('/login');
      return;
    }

    // Hacer una solicitud al backend para obtener información adicional del usuario
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/usuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Actualizar el estado con la información del usuario
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    // Llamar a la función para obtener la información del usuario
    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // Utiliza navigate para redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div className='md:px-12 lg:px-24 max-w-7xl relative items-center w-full px-5 py-12 mx-auto'>
      <div className='lg:mx-auto flex flex-col w-full max-w-lg mb-12 text-center'>
        {userdata ? (
          <>
            <p>Bienvenido, {userdata.name}!</p>
            {/* Mostrar otros datos del usuario según sea necesario */}
            <p>Email: {userdata.email}</p>
            {/* Agrega aquí el resto de tu contenido del dashboard */}
            <button
              className='mt-7 bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105'
              type='submit'
              onClick={handleLogout}
            >
              Logout
            </button>
            {/* Agrega aquí el resto de tu contenido del dashboard */}
          </>
        ) : (
          <p>Cargando información del usuario...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
