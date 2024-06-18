"use client";
import Link from "next/link";
import UseAuth from '../hooks/useAuth';

export default function dashboardPage() {
  UseAuth();
  const signOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center h-screen">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        DASHBOARD
      </h2>
      <div className="flex gap-4">
        <Link href="/users">
          <button className="bg-red-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Usuarios
          </button>
        </Link>
        <Link href="/clients">
          <button className="bg-yellow-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Clientes
          </button>
        </Link>
        <Link href="/suppliers">
          <button className="bg-blue-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Proveedores
          </button>
        </Link>
        <Link href="/products">
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Productos
          </button>
        </Link>
        <Link href="/inventories">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Inventario
          </button>
        </Link>
        <Link href="/warehouses">
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Almacenes
          </button>
        </Link>
      </div>
      <div className="flex gap-4 mt-4">
        <Link href="/purchases">
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Compra
          </button>
        </Link>
        <Link href="/sales">
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
            Venta
          </button>
        </Link>
      </div>
      <div className="mt-4">
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        >
          cerrrar Session
        </button>
      </div>
    </div>
  );
}
