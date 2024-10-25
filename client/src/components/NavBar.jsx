import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="bg-zinc-700 mb-3 flex justify-between py-5 px-10 rounded-lg">
      <ul className="flex w-full justify-between items-center">
        <li className="flex flex-grow basis-0">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold">Tasks Manager</h1>
          </Link>
        </li>
        {isAuthenticated ? (
          <li className="text-2xl">Bienvenido {user.username}</li>
        ) : (
          ""
        )}
        {isAuthenticated ? (
          <div className="flex flex-grow basis-0">
            <li className="flex flex-grow basis-0 justify-end">
              <Link
                to="/"
                className="bg-purple-600 px-4 py-1 rounded-md my-2 hover:bg-purple-800 transition ease-in-out"
                onClick={() => logout()}
              >
                Cerrar Sesion
              </Link>
            </li>
          </div>
        ) : (
          <div className="flex gap-2">
            <li>
              <Link
                to="/login"
                className="bg-purple-600 px-4 py-1 rounded-md my-2 hover:bg-purple-800 transition ease-in-out"
              >
                Iniciar Sesion
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-purple-600 px-4 py-1 rounded-md my-2 hover:bg-purple-800 transition ease-in-out"
              >
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
