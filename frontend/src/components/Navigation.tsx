import React, { useState } from 'react';
import { Menu, LogOut, Lock, ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
  isAdmin,
  onLogout,
  onLoginClick
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  const NavButton = ({ page, label }: { page: string; label: string }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded transition ${currentPage === page ? 'bg-slate-700' : 'hover:bg-slate-800'}`}
    >
      {label}
    </button>
  );

  const MobileNavButton = ({ page, label }: { page: string; label: string }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setMenuOpen(false);
      }}
      className={`w-full text-left px-4 py-2 rounded transition ${currentPage === page ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
    >
      {label}
    </button>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => setCurrentPage('main')}
            className="flex items-center hover:opacity-80 transition"
          >
            <img
              src="/logo.png"
              alt="საგანმანათლებლო ცენტრი"
              className="h-12 w-auto"
            />
          </button>

          <div className="hidden md:flex space-x-1 items-center">
            <NavButton page="main" label="მთავარი" />
            <NavButton page="news" label="სიახლეები" />
            <NavButton page="blog" label="ბლოგი" />
            
            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCoursesDropdownOpen(!coursesDropdownOpen)}
                className={`px-4 py-2 rounded transition flex items-center gap-1 ${
                  currentPage.startsWith('courses') ? 'bg-slate-700' : 'hover:bg-slate-800'
                }`}
              >
                კურსები
                <ChevronDown size={16} className={`transition-transform ${coursesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <button
                    onClick={() => {
                      setCurrentPage('courses-entrance-exam');
                      setCoursesDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  >
                    სააბიტურიენტო საგნები
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('courses-languages');
                      setCoursesDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  >
                    ენების ცენტრი
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('courses-programming');
                      setCoursesDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  >
                    პროგრამირება
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('courses-other');
                      setCoursesDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                  >
                    სხვა კურსები
                  </button>
                </div>
              )}
            </div>

            <NavButton page="about" label="ჩვენ შესახებ" />
            <NavButton page="contact" label="კონტაქტი" />
            {isAdmin ? (
              <>
                <NavButton page="admin" label="ადმინ პანელი" />
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <LogOut size={16} /> გასვლა
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded hover:bg-slate-800 transition flex items-center gap-2"
              >
                <Lock size={16} /> ადმინი
              </button>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-800 px-4 py-2 space-y-1">
          <MobileNavButton page="main" label="მთავარი" />
          <MobileNavButton page="news" label="სიახლეები" />
          <MobileNavButton page="blog" label="ბლოგი" />
          
          {/* Mobile Courses Section */}
          <div className="space-y-1">
            <div className="px-4 py-2 font-semibold text-blue-300">კურსები</div>
            <div className="pl-4 space-y-1">
              <MobileNavButton page="courses-entrance-exam" label="სააბიტურიენტო საგნები" />
              <MobileNavButton page="courses-languages" label="ენების ცენტრი" />
              <MobileNavButton page="courses-programming" label="პროგრამირება" />
              <MobileNavButton page="courses-other" label="სხვა კურსები" />
            </div>
          </div>

          <MobileNavButton page="about" label="ჩვენ შესახებ" />
          <MobileNavButton page="contact" label="კონტაქტი" />
          {isAdmin ? (
            <>
              <MobileNavButton page="admin" label="ადმინ პანელი" />
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded hover:bg-slate-700 transition flex items-center gap-2"
              >
                <LogOut size={16} /> გასვლა
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                onLoginClick();
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 rounded hover:bg-slate-700 transition flex items-center gap-2"
            >
              <Lock size={16} /> ადმინ შესვლა
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
