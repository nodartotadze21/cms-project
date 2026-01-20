import React, { useState } from 'react';
import { Menu, LogOut, Lock } from 'lucide-react';

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
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold">MyWebsite</h1>
          </div>

          <div className="hidden md:flex space-x-1">
            <NavButton page="main" label="Home" />
            <NavButton page="news" label="News" />
            <NavButton page="about" label="About" />
            <NavButton page="contact" label="Contact" />
            {isAdmin ? (
              <>
                <NavButton page="admin" label="Admin Panel" />
                <button
                  onClick={onLogout}
                  className="px-4 py-2 rounded hover:bg-slate-800 transition flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded hover:bg-slate-800 transition flex items-center gap-2"
              >
                <Lock size={16} /> Admin
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
          <MobileNavButton page="main" label="Home" />
          <MobileNavButton page="news" label="News" />
          <MobileNavButton page="about" label="About" />
          <MobileNavButton page="contact" label="Contact" />
          {isAdmin ? (
            <>
              <MobileNavButton page="admin" label="Admin Panel" />
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded hover:bg-slate-700 transition flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
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
              <Lock size={16} /> Admin Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
