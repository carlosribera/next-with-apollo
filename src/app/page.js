import Link from "next/link";
function HomePage() {
  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-black">Sistema de Inventario</h1>
      <p className="text-xl font-bold text-center text-black">Bienvenido</p>
      <p className="text-xl font-bold text-center text-black mb-10">Ingresa a tu cuenta</p>
      <div className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
      <Link href="/auth/login" className="text-xl font-bold text-center text-white">Iniciar Sesion</Link>

      </div>
    </div>
  );
}

export default HomePage;
