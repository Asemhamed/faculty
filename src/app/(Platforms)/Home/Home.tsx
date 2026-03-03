'use client';
import { useState } from 'react';
import { BookOpen, GraduationCap, User, LogOut, Menu, X, ChevronRight } from 'lucide-react';

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState('courses');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const facultyData = {
    name: "Dr. Amr Ghoneim",
    courses: [
      { id: "CS101", title: "Introduction to Computer Science", students: 45 },
      { id: "CS202", title: "Data Structures & Algorithms", students: 32 },
    ],
    results: [
      { student: "Omar Khaled", subject: "CS101", grade: "A" },
      { student: "Sara Ahmed", subject: "CS202", grade: "B+" },
    ],
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facultyData.courses.map((c) => (
              <div key={c.id} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg">{c.title}</h3>
                <p className="text-gray-500 text-sm">{c.id} • {c.students} Students</p>
                <button className="mt-4 text-indigo-600 font-medium text-sm hover:underline">View Enrollment</button>
              </div>
            ))}
          </div>
        );
      case 'results':
        return (
          <table className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Grade</th>
              </tr>
            </thead>
            <tbody>
              {facultyData.results.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-4">{r.student}</td>
                  <td className="p-4 text-gray-500">{r.subject}</td>
                  <td className="p-4 font-bold text-indigo-600">{r.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'profile':
        return (
          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg">
            <h2 className="text-xl font-bold mb-4">Faculty Profile</h2>
            <p className="text-gray-600">Name: <span className="font-medium text-gray-900">{facultyData.name}</span></p>
            <p className="text-gray-600">Department: Computer Science</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`bg-indigo-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl">FacultyHub</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu size={24}/></button>
        </div>
        
        <nav className="mt-6 flex-1">
          {[
            { id: 'courses', icon: BookOpen, label: 'Register Courses' },
            { id: 'results', icon: GraduationCap, label: 'Term Results' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-4 hover:bg-indigo-800 ${activeTab === item.id ? 'bg-indigo-800 border-l-4 border-indigo-400' : ''}`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="ml-4">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button className="p-4 flex items-center text-indigo-300 hover:text-white">
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-4">Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
          <p className="text-gray-500">Manage your academic activity</p>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}