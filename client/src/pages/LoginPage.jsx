import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center h-[calc(100vh-100px)] justify-center ">
      <div className="flex flex-col items-center bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-4xl font-bold">Iniciar Sesion</h1>

        <form className="flex flex-col w-80 " onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { requireda: true })}
            name="email"
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.email && <p className="text-red-500">El email es requerido</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            name="password"
            placeholder="Contraseña"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.password && (
            <p className="text-red-500">La contraseña es requerida</p>
          )}

          {signinErrors.map((error, i) => (
            <div
              key={i}z
              className="bg-red-500 px-1 my-1 text-white rounded text-center"
            >
              {error}
            </div>
          ))}

          <button
            className="bg-purple-600 p-1 rounded-md my-2 hover:bg-purple-800 transition ease-in-out"
            type="submit"
          >
            Iniciar Sesion
          </button>
        </form>

        <p className="flex gap-x-2 justify-between">
          ¿No tienes una cuenta?
          <Link
            className="text-sky-500 underline hover:text-sky-700 transition ease-in-out"
            to="/register"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
