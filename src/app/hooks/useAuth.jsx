// "use client";
// hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const UseAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        router.push('/auth/login');
      }
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/auth/login');
    }
  }, [router]);
};

export default UseAuth;

