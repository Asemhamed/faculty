'use client';
import { useState } from 'react';
import { User, Mail, Phone, Lock, BookOpen } from 'lucide-react';
import { Bounce, toast } from 'react-toastify';
import { RegisterSchema, RegisterType } from '@/app/Schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setToken } from '@/app/Cookies/auth.actions';

export default function FacultyRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    repassword: '',
    terms: false,
  });
  const [error, setError] = useState('');

  const router = useRouter();

  const { handleSubmit,  register, reset,formState:{errors} } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms:false
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterType) {


    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (res.ok && result.message === "success") {
        toast.success('Account created successfully!', {
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
        localStorage.setItem("token", result.token);
        reset();

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
              toast.error(result.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
});
        throw new Error(result.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
});
    } finally {
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        <div className="hidden md:flex w-1/3 bg-indigo-900 p-12 flex-col justify-between text-white">
          <div>
            <BookOpen size={40} className="text-indigo-400 mb-6" />
            <h1 className="text-2xl font-bold">Faculty Join Portal</h1>
            <p className="mt-4 text-indigo-200 text-sm">Join the faculty network to access resources and management tools.</p>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  {...register('name')}
                  className="w-full text-black mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                {errors.name && <span className='text-red-600'>{errors.name?.message}</span>}
              </div>
              
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input 
                  type="tel" 
                  {...register('phone')}
                  className="w-full mt-1 p-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
                {errors.phone && <span className='text-red-600'>{errors.phone?.message}</span>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Institutional Email</label>
              <input 
                type="email" 
                {...register('email')}
                className="w-full mt-1 p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              {errors.email && <span className='text-red-600'>{errors.email?.message}</span>}
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  {...register('password')}
                  className="w-full mt-1 p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                {errors.password && <span className='text-red-600'>{errors.password?.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                  type="password" 
                  {...register('rePassword')}
                  className="w-full mt-1 p-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({...formData, repassword: e.target.value})}
                  required
                />
                {errors.rePassword && <span className='text-red-600'>{errors.rePassword?.message}</span>}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                {...register('terms')}
                id="terms"
                className="rounded text-indigo-600 focus:ring-indigo-500"
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
              </label>
              {errors.terms && <span className='text-red-600'>{errors.terms?.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-800 transition"
            >
              Complete Registration
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}