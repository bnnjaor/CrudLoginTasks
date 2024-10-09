import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center h-[calc(100vh-125px)] justify-center space-y-8">
      <h1 className="text-7xl font-semibold">HOME PAGE</h1>
      <div className=" rounded-lg  max-w-xl mx-auto">
        <p className="text-lg text-zinc-400 mb-4 text-justify">
          Organiza tus tareas, mejora tu productividad. Alcanza tus metas con
          nuestra herramienta intuitiva y fácil de usar. ¡Empieza a gestionar tu
          tiempo de manera efectiva hoy mismo!
        </p>
      </div>
      {isAuthenticated ? (
        <Link
          to="/tasks"
          className=" bg-green-500 px-2 py-2 rounded-md hover:bg-green-800 transition-all ease-in-out"
        >
          VER TAREAS
        </Link>
      ) : (
        <p>Debes Iniciar sesion Primero</p>
      )}
    </div>
  );
};

export default HomePage;
