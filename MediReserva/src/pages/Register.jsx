import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { API_URL } from '../services/config'; // Ruta al archivo config.js

// Esquema de validación con Yup
const schema = yup.object({
  nombre: yup.string().required("Nombre es obligatorio"),
  email: yup.string().email("Correo inválido").required("Correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña es obligatoria")
});

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: data.nombre,           
          usuario: data.email,         
          contrasena: data.password      
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Usuario registrado con éxito ✅');
        console.log('Respuesta del servidor:', result);
      } else {
        alert(`Error: ${result.message}`);
        console.error(result);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error de red o servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("nombre")}
              placeholder="Nombre completo"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <p className="text-red-500 text-sm">{errors.nombre?.message}</p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Correo"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 p-2 rounded w-full"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
