import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common';

export const Header: React.FC = () => {
  const { user, login, logout, loading, isFirebaseAvailable } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthClick = async () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      await login();
    }
  };

  return (
    <header className="bg-jade text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <h1 className="text-xl md:text-2xl font-bold">HanalKapp</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="hover:text-gold transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/categories"
              className="hover:text-gold transition-colors"
            >
              Categorías
            </Link>
            <Link
              to="/favorites"
              className="hover:text-gold transition-colors flex items-center gap-1"
            >
              <span>❤️</span>
              Favoritos
            </Link>

            {/* Auth Button */}
            {isFirebaseAvailable && (
              <div className="relative">
                {user ? (
                  <button
                    onClick={handleAuthClick}
                    className="flex items-center gap-2 hover:text-gold transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gold text-volcanic-800 flex items-center justify-center font-semibold">
                        {user.displayName?.charAt(0) || '?'}
                      </div>
                    )}
                    <span className="hidden lg:inline">{user.displayName}</span>
                  </button>
                ) : (
                  <Button
                    onClick={handleAuthClick}
                    variant="secondary"
                    size="sm"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                  </Button>
                )}

                {/* User Menu Dropdown */}
                {showUserMenu && user && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-volcanic-800">
                    <div className="px-4 py-2 border-b border-volcanic-200">
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-sm text-volcanic-600 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={async () => {
                        setShowUserMenu(false);
                        await logout();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-volcanic-100 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile menu button - TODO: implement mobile menu */}
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
