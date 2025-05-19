import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { registerUser, getRoles } from '../services/authService';

// Esquema de validación con Yup
const schema = yup.object({
  email: yup.string().email("Correo inválido").required("Correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña es obligatoria"),
  first_name: yup.string().required("Nombre es obligatorio"),
  role: yup.string().required("El rol es obligatorio")
});

function Register() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      const response = await getRoles();
      if (response.success) {
        setRoles(response.data);
      } else {
        alert(response.message || 'Error al cargar los roles');
      }
    } catch (error) {
      alert('Error al cargar los roles');
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        role: data.role
      });

      if (response.success) {
        alert('Usuario registrado con éxito ✅');
        navigate('/');
      } else {
        alert(response.message || 'Error al registrar usuario');
      }
    } catch (error) {
      alert(error.message || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("first_name")}
              placeholder="Nombre"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.first_name?.message}</p>
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Correo"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          <div>
            <select
              {...register("role")}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm">{errors.role?.message}</p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
