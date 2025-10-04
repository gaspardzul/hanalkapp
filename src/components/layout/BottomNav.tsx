import { Link, useLocation, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: '🏠', label: 'Inicio' },
  { path: '/search', icon: '🔍', label: 'Buscar' },
  { path: '/favorites', icon: '❤️', label: 'Favoritos' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get current view mode from URL params (only on /search page)
  const viewMode = searchParams.get('view') || 'list';
  const isSearchPage = location.pathname === '/search';

  const handleViewToggle = () => {
    if (isSearchPage) {
      const newView = viewMode === 'list' ? 'map' : 'list';
      const params = new URLSearchParams(searchParams);
      params.set('view', newView);
      setSearchParams(params);
      console.log('🗺️ Bottom nav - switching to:', newView);
    }
  };

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
        
        {/* Map toggle button - only visible on search page */}
        {isSearchPage && (
          <button
            onClick={handleViewToggle}
            className={clsx(
              'flex flex-col items-center justify-center w-full h-full transition-colors',
              {
                'text-jade bg-jade-50': viewMode === 'map',
                'text-volcanic-600 hover:text-jade': viewMode !== 'map',
              }
            )}
          >
            <span className="text-xl mb-1">🗺️</span>
            <span className="text-xs font-medium">Mapa</span>
          </button>
        )}
      </div>
    </nav>
  );
};
