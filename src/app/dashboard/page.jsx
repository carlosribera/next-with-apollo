import Link from "next/link";
export default function dashboardPage() {

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
    </div>
  );
}