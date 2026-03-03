import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-slate-100 text-center">
        
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-50 rounded-full">
            <FileQuestion className="text-indigo-600" size={48} />
          </div>
        </div>

        <h1 className="text-6xl font-extrabold text-slate-800">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mt-2">Page Not Found</h2>
        <p className="text-slate-500 mt-4 mb-8">
          The page you are looking for has been archived, moved, or never existed in the faculty records.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/dashboard" 
            className="flex items-center justify-center gap-2 bg-indigo-700 text-white py-3 rounded-lg font-semibold hover:bg-indigo-800 transition duration-200"
          >
            <ArrowLeft size={18} />
            Return to Dashboard
          </Link>
          
          <Link 
            href="/" 
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}