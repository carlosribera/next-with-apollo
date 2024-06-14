"use client"
import RegisterForm from '../../components/FormRegister';

export default function Register() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className='text-3xl font-bold text-center text-black mb-10'>Registrar Usuario</h2>
      <RegisterForm />
    </div>
    </>
  );
}