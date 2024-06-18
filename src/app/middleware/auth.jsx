import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.token || localStorage.getItem('token');
  const url = req.nextUrl.clone();
  
  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/protected-page', '/another-protected-page'],
};