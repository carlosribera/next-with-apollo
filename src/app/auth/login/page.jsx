"use client"
import LoginForm from '../../components/FormLogin';

export default function Login() {
  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className='text-3xl font-bold text-center text-black mb-10'>Login</h2>
      <LoginForm />
    </div>
    </>
  );
}