'use client';
import { setToken } from '@/app/Cookies/auth.actions';
import { LoginSchema, LoginType } from '@/app/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookOpen, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import { email } from 'zod';

export default function FacultyLoginPage() {
  const [credentials, setCredentials] = useState({ staffId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter()


    const { handleSubmit, control, reset,register ,setError,formState:{isValid,errors} } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: "",
    },
    mode: "onSubmit",
});


async function onSubmit(data: LoginType) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();


      if (res.ok && result.message === "success") {
        toast.success('Account logged in successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
}); 
        await setToken(result.token);
        reset();

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(result.message)
        throw new Error(result.message || "Login failed");
      }
    } catch (err: any) {
        setError('password',{message:err.message || "Invalid email or password"});
    }finally{
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[500px]">
        
        <div className="hidden md:flex w-1/2 bg-indigo-900 p-12 flex-col justify-between text-white">
          <div>
            <BookOpen size={48} className="text-indigo-400 mb-6" />
            <h1 className="text-3xl font-bold">Faculty Portal</h1>
            <p className="mt-4 text-indigo-200">Secure access for staff and administration.</p>
          </div>
          <p className="text-indigo-400 text-sm">© 2026 Academic Institution</p>
        </div>

        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
          <p className="text-gray-500 mb-8">Enter your institutional credentials</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  {...register('email')}
                  className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. FAC-12345"
                  required
                  onChange={(e) => setCredentials({...credentials, staffId: e.target.value})}
                />
              </div>
              {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="password"
                  {...register('password')}
                  className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
              {errors.password && <span className='text-red-600'>{errors.password?.message}</span>}
            </div>

            <button
              disabled={loading}
              className="w-full bg-indigo-700 text-white py-2 rounded-lg font-semibold hover:bg-indigo-800 transition-colors disabled:bg-indigo-400"
            >
              {loading ? 'Verifying...' : 'Access Portal'}
              
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/register" className="text-indigo-600 hover:underline">Do not have account?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}