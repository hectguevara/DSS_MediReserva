import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  nombre: yup.string().required("Nombre es obligatorio"),
  email: yup.string().email("Correo inválido").required("Correo es obligatorio"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Contraseña es obligatoria")
});

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    console.log("Registro:", data);
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