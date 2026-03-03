'use client';
import useLogout from '@/app/(auth)/logout/logout';
import { getToken } from '@/app/Cookies/auth.actions';
import { BookOpen, LogIn, Menu, UserPlus, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
    const {logout} =useLogout();

  useEffect(() => {

    async function setTokenUser (){
    const hasToken = await getToken()
    setToken(hasToken);
    }
    setTokenUser();

  }, []);

function Logout(){
    logout();
}

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="text-indigo-700" size={28} />
            <span className="text-xl font-bold text-indigo-900">FacultyPortal</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {token ? (
              <>
                <button onClick={Logout} className="text-red-500 hover:underline text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-indigo-700 transition flex items-center gap-1">
                  <LogIn size={18} /> Login
                </Link>
                <Link href="/register" className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition flex items-center gap-1">
                  <UserPlus size={18} /> Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          {token ? (
            <>
              <button onClick={Logout} className="text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-600">Login</Link>
              <Link href="/register" className="block text-indigo-700 font-bold">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}