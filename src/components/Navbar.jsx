import { NavLink } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
      isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PDF Merger
            </span>
          </div>
          <div className="flex items-center gap-1">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
