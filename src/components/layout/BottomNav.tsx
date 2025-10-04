import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: '🏠', label: 'Inicio' },
  { path: '/search', icon: '🔍', label: 'Buscar' },
  { path: '/map', icon: '🗺️', label: 'Mapa' },
  { path: '/favorites', icon: '❤️', label: 'Favoritos' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-volcanic-200 shadow-lg z-50">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex flex-col items-center justify-center w-full h-full transition-colors',
                {
                  'text-jade bg-jade-50': isActive,
                  'text-volcanic-600 hover:text-jade': !isActive,
                }
              )}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
